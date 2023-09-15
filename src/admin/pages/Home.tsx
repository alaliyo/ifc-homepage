import { useLogInChack } from "../hooks/Chack";

function Home() {
    useLogInChack();
    
    return(
        <div>
            <br />
            <br />
            <br />
            <h1>홈</h1>
        </div>
    )
}

export default Home;