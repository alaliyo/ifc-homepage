import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import { dbService } from '../../firebase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import localesKo from '@fullcalendar/core/locales/ko'
import { Button, Form } from 'react-bootstrap';
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
        setDate('');
        alert('작성 완료되었습니다.')
    };

    // delete
    const handleDelete = async (e: any) => {
        const event_id = e.event.id;
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteDoc(doc(dbService, "schedules", event_id));
            setScheduleDatas(scheduleDatas.filter(schedule => schedule.id !== event_id)); // 삭제 후 state에서 제거
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
            {loggedIn ? (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    locale={localesKo}
                    events={scheduleDatas}
                    eventTextColor="black"
                    eventDisplay="block"
                    eventBackgroundColor="transparent"
                    eventClick={handleDelete}
                />
            ) : (
                <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={localesKo}
                events={scheduleDatas}
                eventTextColor="black"
                eventDisplay="block"
                eventBackgroundColor="transparent"
            />
            )}
        </>
    );
}

export default YearSchedule;

const FormStyled = styled(Form)`
    width: 300px;
    margin: 0 auto;
`;