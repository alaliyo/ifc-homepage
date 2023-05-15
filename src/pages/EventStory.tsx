import styled from "styled-components";
import CrossFades from "../components/generally/CrossFades";

function EventStory() {
    return(
        <div>
            <CrossFades />
            <Title>행사 페이지 준비중입니다.</Title>
        </div>
    );
}

export default EventStory;

const Title = styled.h2`
    margin-top: 20px;
    color: gray;
    text-align: center;
`;