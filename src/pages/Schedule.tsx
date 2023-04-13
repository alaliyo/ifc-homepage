import styled from 'styled-components';
import CrossFades from "../components/generally/CrossFades";

function Schedule() {
    return(
        <div>
            <CrossFades />
            <Title>일정 페이지 제작중입니다...</Title>
        </div>
    );
}

export default Schedule;

const Title = styled.h2`
    margin-top: 20px;
    color: gray;
    text-align: center;
`;