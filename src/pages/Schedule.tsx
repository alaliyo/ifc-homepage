import { Outlet } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import CrossFades from "../components/generally/CrossFades";
import NavSchedule from '../components/Schedule/NavSchedule';


function Schedule() {
    return(
        <PageBody>
            <CrossFades />
            <ChildBox>
                <NavSchedule />
                    <OutletBox> 
                        <Outlet/>
                    </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Schedule;