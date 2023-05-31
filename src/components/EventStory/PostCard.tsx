import styled from "styled-components";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Black from '../../imgs/Black.jpg'

function PostCard() {
    return(
        <Card style={{ width: '16rem' }}>
            <LinkStyle to={'1'}>
                <Card.Img variant="top" src={Black} />
                <Card.Body>
                    <CardTitle>1. 제목</CardTitle>
                    <CardTextBox>
                        <Card.Text>
                            content
                        </Card.Text>
                    </CardTextBox>
                    <PostDate>23.05.25</PostDate>
                </Card.Body>
            </LinkStyle>
        </Card>
    );
}

export default PostCard;


const LinkStyle = styled(Link)`
    color: black;
    text-decoration: none;
    font-weight: 900;
    &:hover {
        transition: .3s;
    }
`;

const CardTitle = styled(Card.Title)`
    font-weight: 900;
`;

const CardTextBox = styled.div`
    height: 70px;
`

const PostDate = styled.div`
    text-align: right;
`;