import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { YearScheduleData } from "../../utils/dbService";

function ListWeek({setEventData, setShowModal}: any) {
    const yearScheduleData = YearScheduleData();
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [dateLocation, setDateLocation] = useState(`${year}-${month}`);
    
    const dateChange = (e: any) => {
        const newDate = new Date(e.target.value);
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth() + 1);
        setDateLocation(e.target.value);
    };

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

    useEffect(() => {
        if (month < 10) {
            setDateLocation(`${year}-0${month}`);
        } else {
            setDateLocation(`${year}-${month}`);
        }
    }, [year, month])

    return(
        <ListWeekBox>
            <ListWeekHeader>
                <Title type="month" value={dateLocation} onChange={dateChange} />
                <HeaderBtnBox>
                    <Button variant="secondary" size="sm" onClick={handleEventDown}>◀</Button>
                    <Button variant="secondary" size="sm" onClick={handleEventUp}>▶</Button>
                </HeaderBtnBox>
            </ListWeekHeader>

            <ListBox>
                {yearScheduleData && yearScheduleData.map(arr =>
                    arr.contentsArr.sort((a, b) => Number(new Date(a.start)) - Number(new Date(b.start))).map(data => (
                        Number(data.start.split('-')[1]) === month &&
                        Number(data.start.split('-')[0]) === year && (
                            <List 
                                key={data.id}
                                onClick={() => handleEventClick(data.id)}
                            >
                                {data.end ? (
                                    `${data.start.split('-')[2].replace('0', '')} ~ ${data.end.split('-')[2].replace('0', '')}일 : ${data.title}`
                                ) : (
                                    `${data.start.split('-')[2].replace('0', '')}일 : ${data.title}`
                                )} 
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

const Title = styled.input`
    font-size: 20px;
    font-weight: 900;
    width: 150px;
    border: 0;

    &:focus {
        outline: none;
    }
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