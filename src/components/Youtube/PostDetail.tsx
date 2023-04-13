import { useEffect, useState } from 'react';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

interface PostsData {
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse:string,
}

interface Props {
    postsDate: Array<PostsData>
}

function PostDetail() {
    const { postsDate } = useOutletContext<Props>();
    const { postsId } = useParams();
    const [post, setPost] = useState<PostsData>();

    useEffect(() => {
        const postObj = postsDate.find(obj => obj.postId === Number(postsId))
        setPost(postObj)
    }, [postsId, postsDate])

    return(
        <PostDetailBox>
            <LinkBox>
                <Link to="/youtube/posts">←목록으로</Link>
            </LinkBox>
            <PostIframe
                width="100%"
                height="100%"
                src={post?.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </PostIframe>
            <h4>제목: {post?.title}</h4>
            <h5>말씀: {post?.bibleVerse}</h5>
        </PostDetailBox>
    );
}

export default PostDetail;

const PostDetailBox = styled.div`
    width: 80%;
    padding: 20px;
    text-align: center;

    iframe {
        margin: 10px 0;
    }
    h4 {
        margin-top: 10px;
        font-weight: 900;
        @media screen and (max-width: 650px) {
            font-size: 14px;
            margin-top: 5px;
        }
    }
    h5 {
        margin-top: 10px;
        font-weight: 900;
        @media screen and (max-width: 650px) {
            font-size: 12px;
            margin-top: 5px;
        }
    }
    @media screen and (max-width: 650px) {
        padding: 5px;
        font-size: 13px;
        width: 100%;
    }
`;

const LinkBox = styled.div`
    text-align: end;
    a{
        color: gray;
        text-decoration: none;
        font-weight: 900;
    }
`;

const PostIframe = styled.iframe`
    width: 100%;
    height: 100%;
    @media screen and (max-width: 900px) {
        height: 330px;
    }
    @media screen and (max-width: 650px) {
        height: 100%;
    }
`;