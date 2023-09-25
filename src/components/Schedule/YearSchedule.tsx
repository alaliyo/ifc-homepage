import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import localesKo from '@fullcalendar/core/locales/ko'
import './YearSchedule.css'
import ListWeek from './ListWeek';
import useHandleResize from '../../hooks/useHandleResize';
import ScheduleModal from './ScheduleModal';
import { ScheduleDataprops, YearScheduleData } from '../../utils/dbService';
import { Body, ChildTitle } from '../Common/CommonStyled';

function YearSchedule() {
    const windResize = useHandleResize();
    const yearScheduleData = YearScheduleData();
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState<ScheduleDataprops | null>(null);
    
    // 글 클릭 시 핸들러 (상세 Modal)
    const handleEventClick = (e: { event: { id: string; }; }) => {
        const eventId = Number(e.event.id);
        const scheduleData = yearScheduleData
            ?.find(schedule => schedule.contentsArr.some(obj => obj.id === eventId))
            ?.contentsArr.find(obj => obj.id === eventId);
        
        if (scheduleData) {
            setEventData(scheduleData);
            setShowModal(true);
        }
    };

    const handleEventClickWrapper = (e: any) => {
        handleEventClick(e);
    };

    const calendarEvents = yearScheduleData?.reduce((acc, yearSchedule) => {
        const eventsForYear = yearSchedule.contentsArr.map((event) => ({
            id: event.id.toString(), // FullCalendar의 이벤트 ID는 문자열이어야 합니다.
            title: event.title,
            date: event.date,
        }));
        return [...acc, ...eventsForYear];
    }, [] as { id: string; title: string; date: string; }[]);
    
    return (
        <Body>
            <ChildTitle>연중계획</ChildTitle>
            {windResize >= 769? (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height='auto'
                    locale={localesKo}
                    events={calendarEvents}
                    eventDisplay="block"
                    eventClick={handleEventClickWrapper}
                />
            ):(
                <ListWeek
                    setEventData={setEventData}
                    setShowModal={setShowModal}
                />
            )}

            <ScheduleModal
                eventData={eventData}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </Body>
    );
}

export default YearSchedule;