import { Card } from 'react-bootstrap';
import { CardBox, CardFrame, CardText, SeparationText } from './IntroStyled';
import styled from 'styled-components';
import { Body, ChildTitle } from '../Common/CommonStyled';

function Rev() {
    return(
        <Body>
            <ChildTitle>담임 목사</ChildTitle>
            <CardBoxCustom>
                <CardFrame>
                    <Card>
                        <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/ifc-homepage-2a6b5.appspot.com/o/IntroImg%2FRevHong.jpg?alt=media&token=6013fd3f-c173-4615-8102-055df9ce7a77" />
                        <Card.Body>
                            <CardText>홍경희 목사</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
            </CardBoxCustom>
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

const CardBoxCustom = styled(CardBox)`
    grid-template-columns: none;
`;

const BriefHistoryBox = styled.div`
    padding: 0 30px;
    margin-bottom: 50px;

    @media screen and (max-width: 480px) {
        padding: 0 10px;
    }
    
    li {
        font-weight: 900;
        margin-top: 10px;
        word-break: keep-all;
    }
`;