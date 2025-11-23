import VehicleList from "./VehicleList";
import VehicleShow from "./VehicleShow";

export default function Vehicle() {
    return(
        <div>
            <h2>Total Vehicle - {} </h2>
            <VehicleList />
            <VehicleShow />
        </div>
    )
}