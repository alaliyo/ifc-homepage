import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import { PageBody } from './PageStyled';
import PageNav from "../components/Common/PageNav";
import { YoutubeProps } from "../components/Youtube/YoutubeProps";
import { YoutubeData, YoutubeDataArrayProps } from "../utils/dbService";

function Youtube() {
    const [getData, setGetData] = useState<YoutubeDataArrayProps[]>([]);
    const { windowWidth } = useOutletContext<YoutubeProps>(); // 웹 width 크기
    const location = useLocation().pathname.split('/')[2];
    const [arrIndex, setArrIndex] = useState(0);
    const linkInfoArr = [
        {title: '한국', LinkUrl: 'youtube-kr'},
        {title: 'English', LinkUrl: 'youtube-en'},
    ]

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const youtubeData = await YoutubeData(location);
                setGetData(youtubeData ? youtubeData : []);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };
        
        fetchData();
    }, [location]);
    
    return(
        <PageBody>
            <YoutubeBox>
                <PageNav
                    title='유튜브'
                    LinkInfo={linkInfoArr}
                />
                <Outlet context={{
                    getData: getData,
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