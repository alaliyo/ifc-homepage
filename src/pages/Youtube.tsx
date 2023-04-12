import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import CrossFades from "../components/DetailPage/CrossFades";
import NavYoutube from '../components/Youtube/NavYoutube';
import { dbService } from '../friebase';

interface PostsData {
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse:string,
}

function Youtube() {
    const [postsDate, setpostsDate] = useState<Array<PostsData>>([]);

    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, "youtobe-posts"),
            orderBy("postId", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setpostsDate(postsArr);
        });
    }, [])

    return(
        <>
            <CrossFades />
            <YoutubeBox>
                <NavYoutube />
                <Outlet context={{
                    postsDate: postsDate,
                }} />
            </YoutubeBox>
        </>
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
`;