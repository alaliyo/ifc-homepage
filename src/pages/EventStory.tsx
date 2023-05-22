import styled from "styled-components";
import CrossFades from "../components/Common/CrossFades";
import { ChildBox, OutletBox } from "./PageStyled";
import { Outlet } from "react-router-dom";
import PageNav from "../components/Common/PageNav";

function EventStory() {
    return(
        <div>
            <CrossFades />
            <Title>행사 페이지 준비중입니다.</Title>
            <ChildBox>
                <PageNav
                    title="행사"
                    LinkInfo={[
                        {
                            title1: '시험',
                            title2: '이다',
                            LinkUrl: '/',
                        },
                        {
                            title1: '시험',
                            LinkUrl: '/',
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