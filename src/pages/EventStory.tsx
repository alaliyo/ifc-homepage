import { OutletBox, PageBody } from "./PageStyled";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { EventStoryData } from "../utils/dbService";
import { useState } from "react";

function EventStory() {
    const eventStoryData = EventStoryData();
    const [arrIndex, setArrIndex] = useState(0);
    
    return(
        <PageBody>
            <OutletBoxstyle>
                <Outlet context={{
                    getData: eventStoryData,
                    arrIndex: arrIndex,
                    setArrIndex: setArrIndex,
                }} />
            </OutletBoxstyle>
        </PageBody>
    );
}

export default EventStory;

const OutletBoxstyle = styled(OutletBox)`
    width: 1024px;
    margin: 0 auto;
    padding: 20px;

    @media screen and (max-width: 1024px) {
        width: auto;
    }

    @media screen and (max-width: 768px) {
        padding: 15px;
    }

    @media screen and (max-width: 480px) {
        padding: 15px 0;
    }
`;