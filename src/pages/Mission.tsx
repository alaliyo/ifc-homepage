import { ChildBox, OutletBox, PageBody } from './PageStyled';
import { Outlet, useOutletContext } from "react-router-dom";
import NavMission from "../components/Mission/NavMission";

interface MissionProps { // props 타입
    loggedIn: boolean;
    windowWidth: number;
}

function Mission() {
    const { loggedIn, windowWidth } = useOutletContext<MissionProps>();

    return(
        <PageBody>
            <ChildBox>
                <NavMission />
                <OutletBox> 
                    <Outlet context={{
                        loggedIn: loggedIn,
                        windowWidth: windowWidth,
                    }} />
                </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Mission;