import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Button} from 'react-bootstrap';
import Black from '../../imgs/Black.jpg'

function EventPost() {
    return(
        <div>
            <PostsHeader>
                <Title>게시물</Title>
            </PostsHeader>
            <CardsBox>
                <Card style={{ width: '18rem' }}>
                    <Link to={'1'}>
                    <Card.Img variant="top" src={Black} />
                    <Card.Body>
                        <Card.Title>1. 제목</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <div>23.05.25</div>
                    </Card.Body>
                    </Link>
                </Card>
            </CardsBox>
        </div>
    );
}

export default EventPost;

const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between; 
`;

const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;
    @media screen and (max-width: 650px) {
        font-size: 20px;
    }
`;

const CardsBox = styled.div`
    border-top: 2px solid gray;
`;

const LinkStyle = styled(Link)`
    color: black;
    font-size: 18px;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        color: white;
        background-color: gray;
        transition: .3s;
    }
`;

const PostInfo = styled.div`
    display: flex;
    div {
        margin-left: 5px;
    }
`;