import { Card } from 'react-bootstrap';
import { Title, CardBox, CardFrame, CardText, CardBody } from './IntroStyled';
import { Body } from '../Common/CommonStyled';
import { PastorsData } from '../../utils/dbService';

function Elder() {
    const pastorsData = PastorsData();
    
    return(
        <Body>
            <Title>장로 소개</Title>
            <CardBox>
            {pastorsData && pastorsData[2].detail.map((obj, i) => (
                <CardFrame key={i}>
                    <Card>
                        <Card.Img variant="top" src={obj.img} />
                        <CardBody>
                            <CardText>{obj.name}</CardText>
                        </CardBody>
                    </Card>
                </CardFrame>
            ))}
            </CardBox>
        </Body>
    );
}

export default Elder;