import { Outlet } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import PageNav from '../components/Common/PageNav';

function Introduction() {
    const linkInfoArr = [
        {title: '교회비전', LinkUrl: 'vision'},
        {title: '교회연혁', LinkUrl: 'history'},
        {title: '담임목사', LinkUrl: 'rev'},
        {title: '장로', LinkUrl: 'elder'},
        {title: '교역자', LinkUrl: 'pastors'},
        {title: '교회약도', LinkUrl: 'sketch-map'},
    ]

    return(
        <PageBody>
            <ChildBox>
                <PageNav
                    title="교회소개"
                    LinkInfo={linkInfoArr}
                />
                    <OutletBox> 
                        <Outlet/>
                    </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Introduction;