import { Outlet } from "react-router-dom";
import AdminNav from "../AdminNav";
import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox, LayoutBox } from "../style/CommonStyled";

function User() {
    useLogInChack();
    const LinkInfo = [
        {LinkUrl: "certification", title:"인증"},
    ];
    
    return(
        <AdminPageBox>
            <AdminNav LinkInfo={LinkInfo}/>
            <LayoutBox>
                <Outlet />
            </LayoutBox>
        </AdminPageBox>
    )
}

export default User;