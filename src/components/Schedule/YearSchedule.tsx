import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import localesKo from '@fullcalendar/core/locales/ko'
import './YearSchedule.css'
import ListWeek from './ListWeek';
import useHandleResize from '../../hooks/useHandleResize';
import ScheduleModal from './ScheduleModal';
import { ScheduleData, ScheduleDataPoops } from '../../utils/dbService';
import { Body, ChildTitle } from '../Common/CommonStyled';

function YearSchedule() {
    const windResize = useHandleResize();
    const scheduleDatas = ScheduleData();
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState<ScheduleDataPoops | null>(null);

    // 글 클릭 시 핸들러 (상세 Modal)
    const handleEventClick = (e: { event: { id: string; }; }) => {
        const eventId = e.event.id;
        const scheduleData = scheduleDatas.find(schedule => schedule.id === eventId);
        
        if (scheduleData) {
            setEventData(scheduleData);
            setShowModal(true);
        }
    };

    const handleEventClickWrapper = (e: any) => {
        handleEventClick(e);
    };
    
    return (
        <Body>
            <ChildTitle>연중계획</ChildTitle>
            {windResize >= 769? (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height='auto'
                    locale={localesKo}
                    events={
                        scheduleDatas.map(obj => (
                            {
                                id: obj.id,
                                title: (obj.title),
                                date: obj.date,
                            }
                        ))
                    }
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