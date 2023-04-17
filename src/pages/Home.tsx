import CrossFade from './../components/Home/CrossFade';
import { PageBody } from './PageStyled';
//import { useOutletContext } from "react-router-dom";

/*interface WindowSize {
    windowWidth: number
}*/

function Home() {
    //const { windowWidth } = useOutletContext<WindowSize>();

    return(
        <PageBody>
            <CrossFade />
        </PageBody>
    );
}

export default Home;