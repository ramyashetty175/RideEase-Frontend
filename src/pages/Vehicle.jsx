import VehicleList from "./VehicleList";
import VehicleShow from "./VehicleShow";

export default function Vehicle() {
    return(
        <div>
            <h2>Available Vehicles</h2> 
            <VehicleList />
            <VehicleShow />
        </div>
    )
}