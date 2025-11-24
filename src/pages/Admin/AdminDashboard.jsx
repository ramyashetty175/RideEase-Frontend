import AdminProfile from "./AdminProfile";
import Vehicle from "../Vehicle";
import Bookings from "../Bookings";
import OwnerList from "./OwnerList";
import UsersList from "./UsersList";
import BookingCancel from "../BookingCancel";

export default function AdminDashboard() {
    return(
        <div>
            <AdminProfile />
            <Bookings />
            <Vehicle />
            <OwnerList />
            <UsersList />
            <BookingCancel />
        </div>
    )
}