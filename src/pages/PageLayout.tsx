import { Outlet, useOutletContext } from "react-router-dom";
import CrossFades from "../components/Common/CrossFades";
import { PageBody } from "./PageStyled";

interface Props {
    windowWidth: number;
}

function PageLayout() {
    const { windowWidth } = useOutletContext<Props>();

    return(
        <PageBody>
            <CrossFades />
            <Outlet context={{
                windowWidth: windowWidth,
            }} />
        </PageBody>
    );
}

export default PageLayout;