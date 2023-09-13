import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useOutletContext } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { dbService } from '../firebase';
import { PageBody } from './PageStyled';
import PageNav from "../components/Common/PageNav";
import { DataProps, YoutubeProps } from "../components/Youtube/YoutubeProps";

function Youtube() {
    const [krData, setkrDate] = useState<Array<DataProps>>([]); //게시물
    const [enData, setEnDate] = useState<Array<DataProps>>([]); //게시물
    const { windowWidth } = useOutletContext<YoutubeProps>(); // 웹 width 크기
    const { loggedIn } = useOutletContext<YoutubeProps>(); // 로드인 여부
    const linkInfoArr = [
        {title1: '한국', LinkUrl: 'kr-posts'},
        {title1: '영어', LinkUrl: 'en-posts'},
    ]
    
    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, "youtobe-kr-posts"),
            orderBy("date", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setkrDate(postsArr);
        });
    }, [])

    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, "youtobe-en-posts"),
            orderBy("date", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setEnDate(postsArr);
        });
    }, [])
    
    return(
        <PageBody>
            <YoutubeBox>
                <PageNav
                    title='유튜브'
                    LinkInfo={linkInfoArr}
                />
                <Outlet context={{
                    krData: krData,
                    enData: enData,
                    windowWidth: windowWidth,
                    loggedIn: loggedIn,
                }} />
            </YoutubeBox>
        </PageBody>
    );
}

export default Youtube;

const YoutubeBox = styled.div`
    width: 1020px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1020px) {
        margin: 0 0;
        width: 100%;
    }
    @media screen and (max-width: 650px) {
        display: grid;
    }
`;