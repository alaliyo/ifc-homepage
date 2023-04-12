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
            <iframe 
                width="560"
                height="315"
                src={post?.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
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
    }
    h5 {
        margin-top: 10px;
        font-weight: 900;
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