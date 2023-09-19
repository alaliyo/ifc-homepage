import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox } from "../style/CommonStyled";

function Manual() {
    useLogInChack();
    
    return(
        <AdminPageBox>
            <h1>조작방법</h1>
        </AdminPageBox>
    )
}

export default Manual;