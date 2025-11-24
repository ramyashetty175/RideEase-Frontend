import Bookings from "../Bookings";
import UsersList from "../UsersList";
import OwnerMain from "./OwnerMain";
import BookingCancel from "../BookingCancel";
import Vehicle from "../Vehicle";

export default function OwnerDashboard() {
    return(
        <div>
            <OwnerMain />
            <UsersList />
            <Bookings />
            <BookingCancel />
            <Vehicle />
        </div>
    )
}