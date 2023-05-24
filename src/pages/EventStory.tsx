import styled from "styled-components";
import CrossFades from "../components/Common/CrossFades";
import { ChildBox, OutletBox } from "./PageStyled";
import { Outlet } from "react-router-dom";
import PageNav from "../components/Common/PageNav";

function EventStory() {
    return(
        <div>
            <CrossFades />
            <ChildBox>
                <PageNav
                    title="행사"
                    LinkInfo={[
                        {
                            title1: '행사',
                            LinkUrl: '/event-story',
                        },
                    ]}
                />
                <OutletBox> 
                    <Outlet/>
                </OutletBox>
            </ChildBox>
        </div>
    );
}

export default EventStory;

const Title = styled.h2`
    margin-top: 20px;
    color: gray;
    text-align: center;
`;