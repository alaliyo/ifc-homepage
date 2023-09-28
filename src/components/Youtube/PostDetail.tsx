import { useEffect, useState } from 'react';
import { Link, useMatch, useLocation, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { YoutubeData, YoutubeDataArrayProps, YoutubeDataProps } from '../../utils/dbService';
import { DateProps } from './YoutubeProps';

function PostDetail() {
    const [getData, setGetData] = useState<YoutubeDataArrayProps[]>([]);
    const { arrIndex } = useOutletContext<DateProps>();
    const [post, setPost] = useState<YoutubeDataProps>(); // id 값 비교 상세 데이터 들고옴
    const match = useMatch('/youtube/detail/kr/:postsId');
    const currentUrl = match?.pathname;
    const location = useLocation().pathname.split("/");

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const youtubeData = await YoutubeData(location[3] === "kr" ? "youtube-kr" : "youtube-en");
                setGetData(youtubeData ? youtubeData : []);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };
        
        fetchData();
    }, [location]);
    
    useEffect(() => {
        if (getData.length > 0) {
            setPost(getData[arrIndex].contentsArr.find(e => e.id === Number(location[4])));
        }
    }, [arrIndex, getData, location]);
    
    return (
        <PostDetailBox>
            <LinkBox>
                <Link to={currentUrl === '/youtube/detail/kr/' ? '/youtube/youtube-kr' : '/youtube/youtube-en'}>←목록으로</Link>
            </LinkBox>
            {getData.length > 0 && post && (
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