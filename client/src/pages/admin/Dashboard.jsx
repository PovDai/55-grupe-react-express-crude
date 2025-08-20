import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
export function Dashboard() {

    const {email,role}=useContext(UserContext)

    return (
        <main>
            <h1>Hello to the admin page :
                email: {email}
                role: {role}     </h1>
        </main>
    );
}