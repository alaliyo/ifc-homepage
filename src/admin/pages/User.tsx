import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox } from "../style/CommonStyled";

function User() {
    useLogInChack();
    
    return(
        <AdminPageBox>
            <h1>회원관리</h1>
        </AdminPageBox>
    )
}

export default User;