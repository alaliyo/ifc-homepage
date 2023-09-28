import { Outlet, useOutletContext } from 'react-router-dom';
import { PageBody, ChildBox, OutletBox } from './PageStyled';
import PageNav from '../components/Common/PageNav';

interface ScheduleProps { // props 타입
    windowWidth: number;
}

function Schedule() {
    const { windowWidth } = useOutletContext<ScheduleProps>(); // 웹 width 크기
    const linkInfoArr = [
        {title: '예배시간', LinkUrl: 'worship-time'},
        {title: '연중계획', LinkUrl: 'year'},
        {title: '주보', LinkUrl: 'weekly/list'},
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
                        windowWidth: windowWidth,
                    }} />
                </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Schedule;