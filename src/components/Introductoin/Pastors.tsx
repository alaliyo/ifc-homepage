import { Card } from 'react-bootstrap';
import { Title, CardBox, CardFrame, CardText, SeparationText, CardBody } from './IntroStyled';
import { Body } from '../Common/CommonStyled';
import { PastorsData } from '../../utils/dbService';

function Pastors() {
    const pastorsData = PastorsData()

    return(
        <Body>
            <Title>교역자 소개</Title>
            {pastorsData && pastorsData.slice(0, 2).map((obj, i) => (
                <div key={i}>
                    <SeparationText>{obj.separationText}</SeparationText>
                    <CardBox>
                    {obj.detail.map((detailobj, j) => (
                        <CardFrame key={j}>
                            <Card>
                                <Card.Img variant="top" src={detailobj.img} />
                                <CardBody>
                                    <CardText>{detailobj.name}</CardText>
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