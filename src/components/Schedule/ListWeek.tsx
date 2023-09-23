import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { YearScheduleData } from "../../utils/dbService";

function ListWeek({setEventData, setShowModal}: any) {
    const yearScheduleData = YearScheduleData();
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

    const handleEventClick = (id: number) => {
        const scheduleData = yearScheduleData
            ?.find(schedule => schedule.contentsArr.some(obj => obj.id === id))
            ?.contentsArr.find(obj => obj.id === id);
        if (scheduleData) {
            setEventData(scheduleData);
            setShowModal(true);
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

            <ListBox>
                {yearScheduleData && yearScheduleData.map((arr, i) =>
                    arr.contentsArr.map(data => (
                        Number(data.date.split('-')[1]) === month &&
                        Number(data.date.split('-')[0]) === year && (
                            <List 
                                key={data.id}
                                onClick={() => handleEventClick(data.id)}
                            >
                                {data.date.split('-')[2].replace('0', '')}일 - {data.title}
                            </List>
                        )
                    ))
                )}
            </ListBox>
        </ListWeekBox>
    );
}

export default ListWeek;

const ListWeekBox = styled.div`
    padding: 0;
`;

const ListWeekHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
`;

const HeaderBtnBox = styled.div`
    button {
        margin-left: 10px;
        width: 35px;
        text-align: center;
    }
`;

const ListBox = styled.div`
    margin: 10px 0;
    border-top: 2px solid #c2c2c2;
`;

const List = styled.p`
    color: #3d3d3d;
    font-weight: 900;
    font-size: 18px;
    background-color: #ffffff;
    padding: 15px 10px;
    border-bottom: 2px solid #b3b3b3;
    margin: 0;
    
`;