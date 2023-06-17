import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import { dbService } from '../../firebase';
import { useForm } from 'react-hook-form';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import localesKo from '@fullcalendar/core/locales/ko'
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useOutletContext } from 'react-router-dom';
import './YearSchedule.css'
import { Body } from './IntroStyled';

interface ScheduleProps {
    loggedIn: boolean;
    windowWidth: number;
}

interface ScheduleData {
    id: string;
    title: string;
    date: string;
    url: string;
}

function YearSchedule() {
    const { loggedIn } = useOutletContext<ScheduleProps>();
    const { windowWidth } = useOutletContext<ScheduleProps>(); // 웹 width 크기
    const [scheduleDatas, setScheduleDatas] = useState<Array<ScheduleData>>([]);
    const { register, handleSubmit, reset } = useForm<ScheduleData>(); // useForm 사용
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState<ScheduleData | null>(null);
    const [widthBoolean, setWidthBoolean] = useState(false);

    // 게시물 Get
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
    }, [])

    // 게시물 post 
    const onSubmit = async (data: ScheduleData) => {
        try {
            const newDocRef = await addDoc(collection(dbService, 'schedules'), {
                ...data
            });
            const newDoc = await getDoc(newDocRef);
            const newData: ScheduleData = {
                id: newDoc.id,
                ...newDoc.data(),
                title: '',
                date: '',
                url: '',
            };
            setScheduleDatas([...scheduleDatas, newData]);
        } catch (error) {
            alert(error);
            return;
        }
        reset(); // form reset
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

    useEffect(() => {
        setWidthBoolean(windowWidth <= 550 && true)
    }, [windowWidth])

    function handleEventClickWrapper(e: any) {
        handleEventClick(e);
    }
    
    return (
        <Body>
        {loggedIn && (
            <>
                <br />
                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="text"
                            placeholder="제목"
                            {...register('title')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="date"
                            placeholder="날짜"
                            {...register('date')}
                        />
                    </Form.Group>
                    <Button type="submit" variant="outline-secondary" size="sm">완료</Button>
                </FormStyled>
                <br />
            </>
        )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>조회</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalData>{eventData?.title}</ModalData>
                    <ModalData>{eventData?.date}</ModalData>
                    {eventData?.url && (
                        <ModalData>
                            <Link to={'/event-story/post/' + eventData.url}>게시물보기</Link>
                        </ModalData>
                    )}
                    
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
                events={
                    scheduleDatas.map(obj => (
                        {
                            id: obj.id,
                            title: (widthBoolean ? '확인' : obj.title),
                            date: obj.date,
                        }
                    ))
                }
                eventDisplay="block"
                eventClick={loggedIn ? handleDelete : handleEventClickWrapper}
            />
        </Body>
    );
}

export default YearSchedule;

const FormStyled = styled(Form)`
    width: 300px;
    margin: 0 auto;
`;

const ModalData = styled.p`
    font-size: 18px;
`;