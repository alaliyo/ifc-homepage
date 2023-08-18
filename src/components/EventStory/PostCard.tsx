import styled from "styled-components";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHandleResize from "../../hooks/useHandleResize";

interface PostProps {
    postId: number;
    title: string;
    detail: string;
    img: any;
    date: string;
};

interface PostCardProps {
    post: PostProps;
    num: number;
};

function PostCard({ post, num }: PostCardProps) {
    const handleResize = useHandleResize();
    
    return(
        handleResize > 501 ? (
            <CardStyle style={{ width: '14rem' }}>
                <LinkStyle to={`${post.postId}`}>
                    <CardImg variant="top" src={post.img[0]} />
                    <Card.Body>
                        <CardTitle>{num + 1}. {post.title}</CardTitle>
                        <PostDate>{post.date}</PostDate>
                    </Card.Body>
                </LinkStyle>
            </CardStyle>
        ):(
            <SecondCard>
                <LinkStyle to={`${post.postId}`}>
                    <SecondImg src={post.img[0]} />
                    <SecondTextBox>
                        <CardTitle>{num + 1}. {post.title}</CardTitle>
                        <SecondContent>{post.detail}</SecondContent>
                        <PostDate>{post.date}</PostDate>
                    </SecondTextBox>
                </LinkStyle>
            </SecondCard>
        )  
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

    @media screen and (max-width: 500px){
        display: flex;
    }
`;

const CardImg = styled(Card.Img)`
    height: 130px;
`;

const CardTitle = styled(Card.Title)`
    font-weight: 900;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media screen and (max-width: 450px) {
        font-size: 15px;
    }

    @media screen and (max-width: 350px) {
        font-size: 14px;
    }
`;

const PostDate = styled.div`
    font-size: 14px;
    color: gray;
    text-align: right;
`;

const SecondCard = styled.div`
    width: 95%;
    border: 1px solid #ddd;
    margin: 10px 0;
    border-radius: 10px;

    @media screen and (max-width: 450px) {
        width: 100%;
        margin: 8px 0;
    }
`;

const SecondImg = styled.img`
    width: 40%;
    height: 120px;
    border-radius: 10px;

    @media screen and (max-width: 350px) {
        width: 45%;
        height: 100px;
    }
`;

const SecondTextBox = styled.div`
    width: 60%;
    padding: 10px;

    @media screen and (max-width: 350px) {
        width: 55%;
        padding: 5px;
    }
`;

const SecondContent = styled.p`
    font-size: 15px;
    font-weight: 500;
    margin: 7px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;