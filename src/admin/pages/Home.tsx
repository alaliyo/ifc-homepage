import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox } from "../style/CommonStyled";

function Home() {
    useLogInChack();
    
    return(
        <AdminPageBox>
            <h1>홈</h1>
        </AdminPageBox>
    )
}

export default Home;