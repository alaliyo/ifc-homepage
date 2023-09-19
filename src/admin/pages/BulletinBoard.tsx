import AdminNav from "../AdminNav";
import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox, LayoutBox } from "../style/CommonStyled";

function BulletinBoard() {
    useLogInChack();
    
    return(
        <AdminPageBox>
            <AdminNav />
            <LayoutBox>
                <h1>게시판 관리</h1>
            </LayoutBox>
        </AdminPageBox>
    )
}

export default BulletinBoard;