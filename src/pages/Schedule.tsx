import { Outlet, useOutletContext } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import CrossFades from "../components/generally/CrossFades";
import NavSchedule from '../components/Schedule/NavSchedule';

interface ScheduleProps { // props 타입
    loggedIn: boolean;
    windowWidth: number;
}

function Schedule() {
    const { loggedIn } = useOutletContext<ScheduleProps>(); // 로그인 여부
    const { windowWidth } = useOutletContext<ScheduleProps>(); // 웹 width 크기

    return(
        <PageBody>
            <CrossFades />
            <ChildBox>
                <NavSchedule />
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

export default Schedule;