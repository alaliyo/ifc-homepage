import { useLogInChack } from "../hooks/Chack";

function BulletinBoard() {
    useLogInChack();
    
    return(
        <div>
            <br />
            <br />
            <br />
            <h1>게시판 관리</h1>
        </div>
    )
}

export default BulletinBoard;