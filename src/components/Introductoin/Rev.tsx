import { Card } from 'react-bootstrap';
import { Body, Title, HrBottom, CardBox, CardFrame, CardText } from './IntroStyled';
import RevImg from '../../imgs/RevImg.jpg';

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
        </Body>
    );
}

export default Rev;