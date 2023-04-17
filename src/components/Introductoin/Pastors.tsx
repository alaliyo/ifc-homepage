import { Card } from 'react-bootstrap';
import { Body, Title, HrBottom, CardBox, CardFrame, CardText, SeparationText } from './IntroStyled';
import PastorChoi from '../../imgs/PastorChoi.jpg';
import PastorOh from '../../imgs/PastorOh.jpg';
import PastorJeong from '../../imgs/PastorKim.jpg';
import PastorKim from '../../imgs/PastorKim.jpg';

function Pastors() {
    return(
        <Body>
            <Title>교역자 소개</Title>
            <HrBottom />
            <SeparationText>협동 목사</SeparationText>
            <CardBox>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={PastorChoi} />
                        <Card.Body>
                            <CardText>최영미 협동목사</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
            </CardBox>
            <SeparationText>전도사</SeparationText>
            <CardBox>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={PastorOh} />
                        <Card.Body>
                            <CardText>오순자 선임전도사</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={PastorJeong} />
                        <Card.Body>
                            <CardText>정옥경 전도사</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={PastorKim} />
                        <Card.Body>
                            <CardText>김염미 전도사</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
            </CardBox>
        </Body>
    );
}

export default Pastors;