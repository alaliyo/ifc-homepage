import { useLogInChack } from "../hooks/Chack";

function User() {
    useLogInChack();
    
    return(
        <div>
            <br />
            <br />
            <br />
            <h1>회원관리</h1>
        </div>
    )
}

export default User;