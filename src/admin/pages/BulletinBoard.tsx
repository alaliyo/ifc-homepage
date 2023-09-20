import { Outlet } from "react-router-dom";
import AdminNav from "../AdminNav";
import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox, LayoutBox } from "../style/CommonStyled";

const LinkInfo = [
    {LinkUrl: "history", title:"연혁"},
]

function BulletinBoard() {
    useLogInChack();
    
    return(
        <AdminPageBox>
            <AdminNav LinkInfo={LinkInfo}/>
            <LayoutBox>
                <Outlet />
            </LayoutBox>
        </AdminPageBox>
    )
}

export default BulletinBoard;