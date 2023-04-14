import styled from "styled-components";

function History() {
    return(
        <HistoryBox>
            <Title>교회 연혁</Title>
            <hr />
        </HistoryBox>
    );
}

export default History;

const HistoryBox = styled.div`
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: 650px) {
        margin-top: 10px;
    }
`;

const Title = styled.h3`
    font-weight: 900;
    text-align: center;
    margin-bottom: 20px;
    @media screen and (max-width: 650px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
`;