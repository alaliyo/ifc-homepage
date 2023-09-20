import { Outlet } from "react-router-dom";
import Header from "./Header";

function AdminPage() {

    return(
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default AdminPage;