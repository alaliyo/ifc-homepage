import { ChildBox, OutletBox, PageBody } from './PageStyled';
import { Outlet, useOutletContext } from "react-router-dom";
import CrossFades from "../components/Common/CrossFades";
import NavMission from "../components/Mission/NavMission";

interface MissionProps { // props 타입
    loggedIn: boolean;
    windowWidth: number;
}

function Mission() {
    const { windowWidth } = useOutletContext<MissionProps>(); // 웹 width 크기
    const { loggedIn } = useOutletContext<MissionProps>(); // 로드인 여부


    return(
        <PageBody>
            <CrossFades />
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