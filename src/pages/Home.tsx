import CrossFade from './../components/Home/CrossFade';
import { useOutletContext } from "react-router-dom";

interface WindowSize {
    windowWidth: number
}

function Home() {
    const { windowWidth } = useOutletContext<WindowSize>();
    console.log('home', windowWidth)
    return(
        <div>
            <CrossFade />
        </div>
    );
}

export default Home;