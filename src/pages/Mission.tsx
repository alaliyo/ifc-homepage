import styled from "styled-components";
import CrossFades from "../components/generally/CrossFades";
import { PageBody } from './PageStyled';

function Mission() {
    return(
        <PageBody>
            <CrossFades />
            <Title>선교 페이지 제작중입니다...</Title>
        </PageBody>
    );
}

export default Mission;

const Title = styled.h2`
    margin-top: 20px;
    color: gray;
    text-align: center;
`;