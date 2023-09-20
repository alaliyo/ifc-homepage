import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

function AdminPage() {

    return(
        <div>
            <Header />
            <>
                <Outlet />
            </>
        </div>
    )
}

export default AdminPage;