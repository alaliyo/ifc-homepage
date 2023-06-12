import styled from "styled-components";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PostProps {
    postId: number;
    title: string;
    img: any;
    date: string;
}

interface PostCardProps {
    post: PostProps;
    num: number;
}

function PostCard({ post, num }: PostCardProps) {

    return(
        <CardStyle style={{ width: '14rem' }}>
            <LinkStyle to={`${post.postId}`}>
                <CardImg variant="top" src={post.img[0]} />
                <Card.Body>
                    <CardTitle>{num + 1}. {post.title}</CardTitle>
                    <PostDate>{post.date}</PostDate>
                </Card.Body>
            </LinkStyle>
        </CardStyle>
    );
}

export default PostCard;

const CardStyle = styled(Card)`
    margin: 12px;
    @media screen and (max-width: 650px){
        margin: 12px auto;
    }
`;

const LinkStyle = styled(Link)`
    color: black;
    text-decoration: none;
    font-weight: 900;
    &:hover {
        transition: .3s;
    }
`;

const CardImg = styled(Card.Img)`
    height: 130px;
`;

const CardTitle = styled(Card.Title)`
    font-weight: 900;
    font-size: 16px;
`;

const PostDate = styled.div`
    font-size: 14px;
    color: gray;
    text-align: right;
`;