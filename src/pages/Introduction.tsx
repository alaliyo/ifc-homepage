import { Outlet } from 'react-router-dom';
import CrossFades from "../components/generally/CrossFades";
import NavIntroductoin from '../components/Introductoin/NavIntroductoin';
import { PageBody, ChildBox, OutletBox } from './PageStyled';

function Introduction() {
    return(
        <PageBody>
            <CrossFades />
            <ChildBox>
                <NavIntroductoin />
                    <OutletBox> 
                        <Outlet/>
                    </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Introduction;