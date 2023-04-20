import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import { dbService } from '../../firebase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import localesKo from '@fullcalendar/core/locales/ko'
import { Button, Form, Modal } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import './YearSchedule.css'

interface ScheduleProps {
    loggedIn: boolean
}

interface ScheduleData {
    id: string
    title: string
    date: string
}

function YearSchedule() {
    const { loggedIn } = useOutletContext<ScheduleProps>();
    const [scheduleDatas, setScheduleDatas] = useState<Array<ScheduleData>>([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState<ScheduleData | null>(null);

    // 데이터 받기
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "title") {
            setTitle(value);
        } else if (name === "date") {
            setDate(value);
        } 
    };

    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, "schedules"),
            orderBy("date", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const ScheduleArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setScheduleDatas(ScheduleArr);
        });
    }, [scheduleDatas])

    // post 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newDocRef = await addDoc(collection(dbService, 'schedules'), {
            title: title,
            date: date,
            });
            const newDoc = await getDoc(newDocRef);
            const newData: ScheduleData = {
                id: newDoc.id,
                ...newDoc.data(),
                title: '',
                date: ''
            };
            setScheduleDatas([...scheduleDatas, newData]);
        } catch (error) {
            alert(error);
            return;
        }
        setTitle('');
    };

    // delete
    const handleDelete = async (e: any) => {
        const event_id = e.event.id;
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteDoc(doc(dbService, "schedules", event_id));
            setScheduleDatas(scheduleDatas.filter(schedule => schedule.id !== event_id)); // 삭제 후 state에서 제거
        }
    };

    // 글 클릭 시 핸들러 (상세 Modal)
    const handleEventClick = (e: any) => {
        const eventId = e.event.id;
        const scheduleData = scheduleDatas.find(schedule => schedule.id === eventId);
        if (scheduleData) {
            setEventData(scheduleData);
            setShowModal(true);
        }
    };

    return (
        <>
        {loggedIn && (
            <>
                <br />
                <FormStyled onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button type="submit" variant="outline-secondary" size="sm">완료</Button>
                </FormStyled>
                <br />
            </>
        )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>상세 조회</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{eventData?.title}</h4>
                    <h4>{eventData?.date}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height='auto'
                locale={localesKo}
                events={scheduleDatas}
                eventDisplay="block"
                eventClick={loggedIn ? handleDelete : handleEventClick}
            />
        </>
    );
}

export default YearSchedule;

const FormStyled = styled(Form)`
    width: 300px;
    margin: 0 auto;
`;