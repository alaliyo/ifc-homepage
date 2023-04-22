import { Card } from 'react-bootstrap';
import { Body, Title, HrBottom, CardBox, CardFrame, CardText, SeparationText } from './IntroStyled';
import RevImg from '../../imgs/RevImg.jpg';
import styled from 'styled-components';

function Rev() {
    return(
        <Body>
            <Title>담임 목사</Title>
            <HrBottom />
            <CardBox>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={RevImg} />
                        <Card.Body>
                            <CardText>홍경희 목사</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
            </CardBox>
            <BriefHistoryBox>
                <SeparationText>약력</SeparationText>
                <ul>
                    <li>JWM(Jesus World Mission) 스리랑카 신학교 교수</li>
                    <li>아솔신학대학 교수</li>
                    <li>VOCA 브니엘미스바 총회 회장</li>
                    <li>브니엘 신학대학 이사</li>
                    <li>열방교회 담임</li>
                    <li>브니엘 신학대학원 졸업</li>
                </ul>
            </BriefHistoryBox>
        </Body>
    );
}

export default Rev;

const BriefHistoryBox = styled.div`
    padding: 0 30px;
    margin-bottom: 50px;
    @media screen and (max-width: 500px) {
        padding: 0 10px;
    }
    li {
        font-weight: 900;
        margin-top: 10px;
        word-break: keep-all;
    }
`;