import axios from "axios";
import UserContext from "@/context/UserContext";
import { useContext } from "react";

export default function useRazorpayPayment() {
  const { user } = useContext(UserContext);

  const handlePayment = async (amount) => {
    return new Promise(async (resolve) => {
      try {
        if (amount < 1) {
          alert("Minimum amount is ₹1");
          return resolve(false);
        }

        const { data } = await axios.post("http://localhost:3020/api/payments/createOrder", {
          amount: amount,
          // currency: "INR",
          // receipt: bookingId, // send bookingId as receipt
          // notes: {},
        });

        console.log("Backend response:", data);

        if (!data.orderId || !data.key) {
          console.log("Order creation failed - missing fields:", data);
          alert("Order creation failed - missing orderId or key");
          return resolve(false);
        }
        const { orderId, key } = data;
        const options = {
          key: key,
          amount: amount,
          currency: "INR",
          name: "RideEase",
          description: "Slot Booking Payment",
          order_id: orderId,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "99999999888",
          },
          handler: async function (response) {
            try {
              const verifyRes = await axios.post("/api/payments/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              if (verifyRes.data.status === "ok") {
                resolve(true);
              } else {
                alert("Payment verification failed");
                resolve(false);
              }
            } catch (err) {
              console.log(err);
              alert("Error verifying payment");
              resolve(false);
            }
          },
          modal: {
            ondismiss: function () {
              resolve(false); 
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.log(err);
        alert("Something went wrong with payment");
        resolve(false);
      }
    });
  };
  return handlePayment;
}