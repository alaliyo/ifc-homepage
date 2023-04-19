import { Outlet, useOutletContext } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import CrossFades from "../components/generally/CrossFades";
import NavSchedule from '../components/Schedule/NavSchedule';

interface ScheduleProps {
    loggedIn: boolean;
}

function Schedule() {
    const { loggedIn } = useOutletContext<ScheduleProps>();

    return(
        <PageBody>
            <CrossFades />
            <ChildBox>
                <NavSchedule />
                    <OutletBox> 
                        <Outlet context={{
                            loggedIn: loggedIn,
                        }} />
                    </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Schedule;