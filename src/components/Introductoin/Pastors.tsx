import { Card } from 'react-bootstrap';
import { CardBox, CardFrame, CardText, SeparationText, CardBody } from './IntroStyled';
import { Body, ChildTitle } from '../Common/CommonStyled';
import { ServersData } from '../../utils/dbService';

function Pastors() {
    const serversData = ServersData();
    
    return(
        <Body>
            <ChildTitle>교역자 소개</ChildTitle>
            {serversData && serversData.slice(0, 2).map((arr, i) => (
                <div key={i}>
                    <SeparationText>{arr.separationText}</SeparationText>
                    <CardBox>
                    {arr.contentsArr.map((obj, j) => (
                        <CardFrame key={j}>
                            <Card>
                                <Card.Img variant="top" src={obj.imgUrls[0]} />
                                <CardBody>
                                    <CardText>{obj.name}</CardText>
                                </CardBody>
                            </Card>
                        </CardFrame>
                    ))}
                    </CardBox>
                </div>
            ))}
        </Body>
    );
}

export default Pastors;