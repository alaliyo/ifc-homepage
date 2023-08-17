import styled from "styled-components";
import { PageBody } from './PageStyled';

function Ministry() {
    return(
        <PageBody>
            <Title>사역 페이지 제작중입니다...</Title>
        </PageBody>
    );
}

export default Ministry;

const Title = styled.h2`
    margin-top: 20px;
    color: gray;
    text-align: center;
`;