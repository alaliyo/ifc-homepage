import { useEffect, useState } from 'react';
import { useOutletContext, useParams, Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';

interface PostsData { //데이터 타입
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse:string,
}

interface Props { //props 타입
    krData: Array<PostsData>;
    enData: Array<PostsData>;
}

function PostDetail() {
    const { krData, enData } = useOutletContext<Props>();
    const { postsId } = useParams(); // url의 post id 값
    const [post, setPost] = useState<PostsData>(); // id 값 비교 상세 데이터 들고옴
    const match = useMatch('/youtube/detail/kr/:postsId');
    const currentUrl = match?.pathname || '/youtube/detail/en/';
    const [flexibleData, setFlexibleData] = useState<PostsData[]>();
    
    // 데이터 조회 hook
    useEffect(() => {
        const postObj = flexibleData?.find(obj => obj.postId === Number(postsId))
        setPost(postObj)
    }, [flexibleData, postsId]);

    // 한국 또는 영어 date 조회
    useEffect(() => {
        if (currentUrl === '/youtube/detail/en/') {
            setFlexibleData(enData);
        } else {
            setFlexibleData(krData);
        }
    }, [currentUrl, enData, krData]);

    return(
        <PostDetailBox>
            <LinkBox>
                <Link to={currentUrl === '/youtube/detail/en/' ? '/youtube/en-posts' : '/youtube/kr-posts'}>←목록으로</Link>
            </LinkBox>
            <PostBox>
                <PostIframe
                    width="100%"
                    height="100%"
                    src={post?.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </PostIframe>
            </PostBox>
            <h4>제목: {post?.title}</h4>
            <h5>말씀: {post?.bibleVerse}</h5>
        </PostDetailBox>
    );
}

export default PostDetail;

const PostDetailBox = styled.div`
    padding: 20px;
    width: 80%;
    text-align: center;

    h4 {
        margin-top: 10px;
        font-weight: 900;

        @media screen and (max-width: 650px) {
            font-size: 15px;
            margin-top: 5px;
        }
    }

    h5 {
        margin-top: 10px;
        font-weight: 900;

        @media screen and (max-width: 650px) {
            font-size: 15px;
            margin-top: 5px;
        }
    }

    @media screen and (max-width: 650px) {
        padding: 5px;
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

const PostBox = styled.div`
    width: 100%;
    height: 436px;

    @media screen and (max-width: 900px) {
        height: 350px;
    }

    @media screen and (max-width: 650px) {
        height: 350px;
    }

    @media screen and (max-width: 550px) {
        height: 320px;
    }

    @media screen and (max-width: 400px) {
        height: 220px;
    }
`;

const PostIframe = styled.iframe`
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