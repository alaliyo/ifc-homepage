import { ChildBox, OutletBox, PageBody } from './PageStyled';
import { Outlet } from "react-router-dom";
import PageNav from '../components/Common/PageNav';

function Mission() {
    const linkInfoArr = [
        {title: "선교", LinkUrl: "/mission/overseas"},
        {title: "전도", LinkUrl: "/mission/domestic"},
    ]
    
    return(
        <PageBody>
            <ChildBox>
                <PageNav
                    title='일정'
                    LinkInfo={linkInfoArr}
                />
                <OutletBox> 
                    <Outlet />
                </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Mission;