import { Outlet } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import PageNav from '../components/Common/PageNav';

function Introduction() {
    const linkInfoArr = [
        {title1: '교회', title2: '비전', LinkUrl: 'vision'},
        {title1: '교회', title2: '연혁', LinkUrl: 'history'},
        {title1: '담임', title2: '목사', LinkUrl: 'rev'},
        {title1: '교역자', LinkUrl: 'pastors'},
        {title1: '장로', LinkUrl: 'elder'},
        {title1: '교회', title2: '약도', LinkUrl: 'sketch-map'},
    ]

    return(
        <PageBody>
            <ChildBox>
                <PageNav
                    title='교회소개'
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