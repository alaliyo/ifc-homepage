import { Outlet, useOutletContext } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import PageNav from '../components/Common/PageNav';

interface ScheduleProps { // props 타입
    loggedIn: boolean;
    windowWidth: number;
}

function Schedule() {
    const { loggedIn } = useOutletContext<ScheduleProps>(); // 로그인 여부
    const { windowWidth } = useOutletContext<ScheduleProps>(); // 웹 width 크기
    const linkInfoArr = [
        {title1: '예배', title2: '시간', LinkUrl: 'worship-time'},
        {title1: '연중', title2: '계획', LinkUrl: 'year'},
    ]

    return(
        <PageBody>
            <ChildBox>
                <PageNav
                    title='일정'
                    LinkInfo={linkInfoArr}
                />
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