import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Body, ChildTitle } from "../Common/CommonStyled";
import { WeekDataArrayPoops, WeeklyData } from "../../utils/dbService";

export interface DataProps {
    getData: WeekDataArrayPoops[];
    arrIndex: number;
    setArrIndex: any;
};

function Weekly() {
    const weeklyData = WeeklyData();
    const [arrIndex, setArrIndex] = useState(0);
    
    return(
        <Body>
            <ChildTitle>주보</ChildTitle>
            <Outlet context={{
                getData: weeklyData,
                arrIndex: arrIndex,
                setArrIndex: setArrIndex,
            }}/>
        </Body>
    );
}

export default Weekly;