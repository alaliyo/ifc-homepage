import { Outlet } from "react-router-dom";
import AdminNav from "../AdminNav";
import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox, LayoutBox } from "../style/CommonStyled";

const LinkInfo = [
    {LinkUrl: "history", title:"연혁"},
    {LinkUrl: "year", title:"연중계획"},
    {LinkUrl: "youtube", title:"유튜브"},
    {LinkUrl: "weekly", title:"주보"},
    {LinkUrl: "servers", title:"섬김이"},
    {LinkUrl: "event-story", title:"게시물"},
];

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