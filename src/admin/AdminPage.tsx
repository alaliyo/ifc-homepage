import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

function AdminPage() {

    return(
        <div>
            <Header />
            <OutletBox>
                <Outlet />
            </OutletBox>
        </div>
    )
}

export default AdminPage;

const OutletBox = styled.div`
    width: 1200px;
    margin-top: 0 auto;
`;