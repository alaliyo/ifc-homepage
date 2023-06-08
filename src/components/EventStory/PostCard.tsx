import styled from "styled-components";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Black from '../../imgs/Black.jpg';

interface PostProps {
    id: string;
    title: string;
    img: string;
    date: string;
}

interface PostCardProps {
    post: PostProps;
}

function PostCard({ post }: PostCardProps) {
    return(
        <CardStyle style={{ width: '14rem' }}>
            <LinkStyle to={post.id}>
                <Card.Img variant="top" src={post.img} />
                <Card.Body>
                    <CardTitle>{Number(post.id) + 1}. {post.title}</CardTitle>
                    <PostDate>{post.date}</PostDate>
                </Card.Body>
            </LinkStyle>
        </CardStyle>
    );
}

export default PostCard;

const CardStyle = styled(Card)`
    margin: 12px;
`;

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