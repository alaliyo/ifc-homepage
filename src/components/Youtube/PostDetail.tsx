import { useEffect, useState } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DateProps, VideoProps } from './YoutubeProps';

function PostDetail() {
    const { krVideos, enVideos } = useOutletContext<DateProps>();
    const location = useLocation().pathname.split("/");
    const [getData, setDate] = useState<VideoProps>();
    console.log(getData);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // 뒤로 가기 기능을 수행하는 함수
    };

    useEffect(() => {
        if (location[3] === 'kr') {
            const obj = krVideos.filter(obj => obj.id === location[4]);
            setDate(obj[0]);
        } else if (location[3] === 'en') {
            const obj = enVideos.filter(obj => obj.id === location[4]);
            setDate(obj[0]);
        }     
    }, [enVideos, krVideos, location])

    return (
        <PostDetailBox>
            <LinkBox>
                <span onClick={handleGoBack}>←목록으로</span>
            </LinkBox>
            {getData && (
                <>
                    <PostBox>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/PUs4-OiibxQ?si=${getData.id}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </PostBox>
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

    span {
        color: gray;
        text-decoration: none;
        font-weight: 900;
    }
`;

const PostBox = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
`;