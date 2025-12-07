import { useSelector } from "react-redux";

export default function OwnerList() {
    const { data } = useSelector((state) => {
        return state.Owner;
    })

    return(
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { data.map((ele, i) => {
                    return(
                        <tr key={ele._id}>
                            <td>{ i+1 }</td>
                            <td>{ ele.name }</td>
                            <td>{ ele.email }</td>
                            <td>{ ele.phone }</td>
                            <td></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}