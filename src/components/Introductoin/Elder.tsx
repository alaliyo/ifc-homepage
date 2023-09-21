import { Card } from 'react-bootstrap';
import { CardBox, CardFrame, CardText, CardBody } from './IntroStyled';
import { Body, ChildTitle } from '../Common/CommonStyled';
import { PastorsData } from '../../utils/dbService';

function Elder() {
    const pastorsData = PastorsData();
    
    return(
        <Body>
            <ChildTitle>장로 소개</ChildTitle>
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