import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useOutletContext } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import CrossFades from "../components/Common/CrossFades";
import NavYoutube from '../components/Youtube/NavYoutube';
import { dbService } from '../firebase';
import { PageBody } from './PageStyled';

interface PostsData { // post 타입
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse:string,
}

interface YoutubeProps { // props 타입
    windowWidth: number;
    loggedIn: boolean;
}

function Youtube() {
    const [krData, setkrDate] = useState<Array<PostsData>>([]); //게시물
    const [enData, setEnDate] = useState<Array<PostsData>>([]); //게시물
    const { windowWidth } = useOutletContext<YoutubeProps>(); // 웹 width 크기
    const { loggedIn } = useOutletContext<YoutubeProps>(); // 로드인 여부
    
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
            <CrossFades />
            <YoutubeBox>
                <NavYoutube />
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