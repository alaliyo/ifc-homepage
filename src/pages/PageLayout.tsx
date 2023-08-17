import { Outlet, useOutletContext } from "react-router-dom";
import CrossFades from "../components/Common/CrossFades";
import { PageBody } from "./PageStyled";

interface Props {
    loggedIn: boolean;
    windowWidth: number;
}

function PageLayout() {
    const { loggedIn, windowWidth } = useOutletContext<Props>();

    return(
        <PageBody>
            <CrossFades />
            <Outlet context={{
                windowWidth: windowWidth,
                loggedIn: loggedIn,
            }} />
        </PageBody>
    );
}

export default PageLayout;