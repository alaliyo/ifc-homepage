import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";

interface PostProps {
    id: number;
    title: string;
    detail: string;
    img: string;
    date: string;
    url: string;
}

interface EventPostProps {
    loggedIn: boolean;
    posts: Array<PostProps>;
}

function EventPostDetail() {
    const { posts } = useOutletContext<EventPostProps>();
    const { postId } = useParams(); // url의 post id 값
    const [post, setPost] = useState<PostProps | undefined>();
    
    useEffect(() => {
        console.log(posts, postId)
        const foundPost = posts.find((e) => e.id === Number(postId));
        if (foundPost) {
            setPost(foundPost);
        }
    }, [posts, postId]);

    return(
        <EventPostDetailBox>
            <ListLink to='/event-story/post'>←목록으로</ListLink>
            {post !== undefined ? (<>
                <DetailHeader>
                    <PostTitle>제목: {post.title}</PostTitle>
                    <PostDate>{post.date}</PostDate>
                </DetailHeader>
                <hr />
                <DetailBody>
                    <DetailImg src={post.img} />
                    {post.url && (
                        <DetailIframe
                            width="100%"
                            height="100%"
                            src={post?.url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </DetailIframe>
                    )}
                    <br />
                    <DetailText>{post.detail}</DetailText>
                </DetailBody>
            </>) : (
                null
            )}
        </EventPostDetailBox>
    );
}

export default EventPostDetail;

const EventPostDetailBox = styled.div`
    
`;

const ListLink = styled(Link)`
    color: #3636368d;
    font-weight: 900;
    text-decoration: none;
`;

const DetailHeader = styled.header`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    p {
        margin-bottom: 5px;
    }
`

const PostTitle = styled.p`
    font-size: 20px;
    font-weight: 900;
`;

const PostDate = styled.p`
    font-size: 18px;
    font-weight: 900;
    color: gray;
`;

const DetailBody = styled.div`
    
`;

const DetailImg = styled.img`
    width: 80%;
    margin: 0 auto;
    display: block;
`;

const DetailText = styled.p`
    margin: 5px 20px;
    font-weight: 900;
`

const DetailIframe = styled.iframe`
    width: 100%;
    @media screen and (max-width: 650px) {
        height: 330px;
    }
    @media screen and (max-width: 550px) {
        height: 300px;
    }
    @media screen and (max-width: 400px) {
        height: 200px;
    }
`;