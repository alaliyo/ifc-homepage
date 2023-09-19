import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox } from "../style/CommonStyled";

function Maintain() {
    useLogInChack();
    
    return(
        <AdminPageBox>
            <h1>유지보수</h1>
        </AdminPageBox>
    )
}

export default Maintain;