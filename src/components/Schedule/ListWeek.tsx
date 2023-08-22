import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

interface ScheduleData {
    id: string;
    title: string;
    date: string;
    url: string;
}

interface ListWeekProps {
    scheduleDatas: Array<ScheduleData>;
}

function ListWeek({scheduleDatas}: ListWeekProps) {
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);

    const handleEventUp = () => {
        setMonth(e => e + 1);
        
        if (month > 11) {
            setYear(e => e + 1);
            setMonth(1);
        }
    };

    const handleEventDown = () => {
        setMonth(e => e - 1);

        if (month < 2) {
            setYear(e => e - 1);
            setMonth(12);
        } 
        
    };

    return(
        <ListWeekBox>
            <ListWeekHeader>
                <h3>{year}년 {month}월</h3>
                <HeaderBtnBox>
                    <Button variant="secondary" size="sm" onClick={handleEventDown}>◀</Button>
                    <Button variant="secondary" size="sm" onClick={handleEventUp}>▶</Button>
                </HeaderBtnBox>
            </ListWeekHeader>

            {scheduleDatas.map(data => 
                Number(data.date.split('-')[1]) === month &&
                Number(data.date.split('-')[0]) === year && (
                <>
                    <p>{data.title}</p>
                    <p>{data.date}</p>
                </>
            ))}
        </ListWeekBox>
    );
}

export default ListWeek;

const ListWeekBox = styled.div`
    padding: 0 10px;
`;

const ListWeekHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeaderBtnBox = styled.div`
    button {
        margin-left: 10px;
        width: 35px;
        text-align: center;
    }
`;