import { useEffect, useState } from 'react';
import { useOutletContext, useParams, Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { YoutubeDataProps } from '../../utils/dbService';
import { DateProps } from './YoutubeProps';

function PostDetail() {
    const { getData, arrIndex } = useOutletContext<DateProps>();
    const { postsId } = useParams(); // url의 post id 값
    const [post, setPost] = useState<YoutubeDataProps>(); // id 값 비교 상세 데이터 들고옴
    const match = useMatch('/youtube/detail/kr/:postsId');
    const currentUrl = match?.pathname;

    useEffect(() => {
        if (getData && getData.length > 0) {
            const postObj = getData[arrIndex].contentsArr.find((obj) => obj.id === Number(postsId));
            setPost(postObj);
        }
    }, [getData, arrIndex, postsId]);

    return (
        <PostDetailBox>
            <LinkBox>
                <Link to={currentUrl === '/youtube/detail/kr/' ? '/youtube/youtube-kr' : '/youtube/youtube-en'}>←목록으로</Link>
            </LinkBox>
            {post && (
                <>
                    <PostBox>
                        <iframe
                            width="100%"
                            height="100%"
                            src={post.url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </PostBox>
                    <h4>제목: {post.title}</h4>
                    <h5>말씀: {post.bible}</h5>
                </>
            )}
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
    aspect-ratio: 16 / 9;
`;