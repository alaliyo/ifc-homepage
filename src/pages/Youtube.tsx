import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useOutletContext } from 'react-router-dom';
import axios from "axios";
import { PageBody } from './PageStyled';
import PageNav from "../components/Common/PageNav";
import { VideoProps, YoutubeProps } from "../components/Youtube/YoutubeProps";

const YOUTUBE_API_KEY = "AIzaSyBHPdp_k5PZEct4sCqiXMUfA3aBuHkxp4M"
const KR_PLAYLIST_ID = "PLyZ3_L57y4YU-3sOGkUhOvdJWBOFJsLjp"
const EN_PLAYLIST_ID = "PL7CoeAYVI5P1zv1aYSvyupwbBndNGQwWy"

function Youtube() {
    const { windowWidth } = useOutletContext<YoutubeProps>(); // 웹 width 크기
    const [arrIndex, setArrIndex] = useState(0);
    const [krVideos, setKrVideos] = useState<VideoProps[]>([]);
    const [enVideos, setEnVideos] = useState<VideoProps[]>([]);
    const linkInfoArr = [
        {title: '한국', LinkUrl: 'youtube-kr'},
        {title: 'English', LinkUrl: 'youtube-en'},
    ]

    // 한국 예배
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                let fetchedVideos: VideoProps[] = [];
                let nextPageToken = '';
    
                do {
                    const response = await axios.get(
                        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${KR_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}&maxResults=100000${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
                    );
                    
                    fetchedVideos = [
                        ...fetchedVideos,
                        ...response.data.items.map((item: any) => ({
                            id: item.snippet.resourceId.videoId,
                            title: item.snippet.title,
                            img: item.snippet.thumbnails.medium.url,
                            content: item.snippet.description,
                        })),
                    ];
    
                    nextPageToken = response.data.nextPageToken || '';
                } while (nextPageToken);
                const dateReverse = [...fetchedVideos].reverse();

                setKrVideos(dateReverse);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };
    
        fetchPlaylist();
    }, []);

    // 영어 예배
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                let fetchedVideos: VideoProps[] = [];
                let nextPageToken = '';
    
                do {
                    const response = await axios.get(
                        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${EN_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}&maxResults=100000${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
                    );
                    
                    fetchedVideos = [
                        ...fetchedVideos,
                        ...response.data.items.map((item: any) => ({
                            id: item.snippet.resourceId.videoId,
                            title: item.snippet.title,
                            img: item.snippet.thumbnails.medium.url,
                            content: item.snippet.description,
                        })),
                    ];
    
                    nextPageToken = response.data.nextPageToken || '';
                } while (nextPageToken);
                const dateReverse = [...fetchedVideos].reverse();

                setEnVideos(dateReverse);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };
    
        fetchPlaylist();
    }, []);
    
    return(
        <PageBody>
            <YoutubeBox>
                <PageNav
                    title='유튜브'
                    LinkInfo={linkInfoArr}
                />
                <Outlet context={{
                    krVideos: krVideos,
                    enVideos: enVideos,
                    windowWidth: windowWidth,
                    arrIndex: arrIndex,
                    setArrIndex: setArrIndex,
                }} />
            </YoutubeBox>
        </PageBody>
    );
}

export default Youtube;

const YoutubeBox = styled.div`
    width: 1024px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1024px) {
        margin: 0 0;
        width: 100%;
    }
    @media screen and (max-width: 768px) {
        display: grid;
    }
`;