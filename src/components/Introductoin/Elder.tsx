import { Card } from 'react-bootstrap';
import { CardBox, CardFrame, CardText, CardBody } from './IntroStyled';
import { Body, ChildTitle } from '../Common/CommonStyled';
import { ServersData } from '../../utils/dbService';

function Elder() {
    const serversData = ServersData();
    
    return(
        <Body>
            <ChildTitle>장로 소개</ChildTitle>
            <CardBox>
            {serversData && serversData[2].contentsArr.map((obj, i) => (
                <CardFrame key={i}>
                    <Card>
                        <Card.Img variant="top" src={obj.imgUrls[0]} />
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