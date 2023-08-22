import { useEffect, useState } from 'react';
import { deleteDoc, doc } from "firebase/firestore";
import { authService, dbService } from '../../firebase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import localesKo from '@fullcalendar/core/locales/ko'
import './YearSchedule.css'
import { Body } from './IntroStyled'; 
import ListWeek from './ListWeek';
import useHandleResize from '../../hooks/useHandleResize';
import ScheduleModal from './ScheduleModal';
import { ScheduleData, ScheduleDataPoops } from '../../utils/dbService';
import ScheduleWrite from './ScheduleWrite';

function YearSchedule() {
    const loggedIn = authService.currentUser;
    const windResize = useHandleResize();
    const scheduleDatas = ScheduleData();
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState<ScheduleDataPoops | null>(null);
    const [widthBoolean, setWidthBoolean] = useState(false);

    // delete
    const handleDelete = async (e: { event: { id: string; }; }) => {
        const event_id = e.event.id;
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteDoc(doc(dbService, "schedules", event_id));
        }
    };

    // 글 클릭 시 핸들러 (상세 Modal)
    const handleEventClick = (e: { event: { id: string; }; }) => {
        const eventId = e.event.id;
        const scheduleData = scheduleDatas.find(schedule => schedule.id === eventId);
        if (scheduleData) {
            setEventData(scheduleData);
            setShowModal(true);
        }
    };

    // 일정 글자 수 표기
    const letterNum = (text: string) => {
        const newText = text.slice(0, 3);
        return `${newText}...`;
    }

    useEffect(() => {
        setWidthBoolean(windResize <= 550 && true)
    }, [windResize])

    function handleEventClickWrapper(e: any) {
        handleEventClick(e);
    }
    
    return (
        <Body>
            {loggedIn && (
                <ScheduleWrite />
            )}

            {windResize > 551? (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height='auto'
                    locale={localesKo}
                    events={
                        scheduleDatas.map(obj => (
                            {
                                id: obj.id,
                                title: (widthBoolean ? letterNum(obj.title) : obj.title),
                                date: obj.date,
                            }
                        ))
                    }
                    eventDisplay="block"
                    eventClick={loggedIn ? handleDelete : handleEventClickWrapper}
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