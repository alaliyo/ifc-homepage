import { Card } from 'react-bootstrap';
import { Title, HrBottom, CardBox, CardFrame, CardText } from './IntroStyled';
import ElderSong from '../../imgs/ElderSong.jpg';
import ElderKim from '../../imgs/ElderKim.jpg';
import { Body } from '../Common/CommonStyled';

function Elder() {
    return(
        <Body>
            <Title>장로 소개</Title>
            <HrBottom />
            <CardBox>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={ElderKim} />
                        <Card.Body>
                            <CardText>김차묵 장로</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
                <CardFrame>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={ElderSong} />
                        <Card.Body>
                            <CardText>송명열 장로</CardText>
                        </Card.Body>
                    </Card>
                </CardFrame>
            </CardBox>
        </Body>
    );
}

export default Elder;