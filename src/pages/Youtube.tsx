import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useOutletContext } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import CrossFades from "../components/generally/CrossFades";
import NavYoutube from '../components/Youtube/NavYoutube';
import { dbService } from '../firebase';

interface PostsData {
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse:string,
}

interface YoutubeProps {
    windowWidth: number;
    loggedIn: boolean;
}

function Youtube() {
    const [postsDate, setpostsDate] = useState<Array<PostsData>>([]);
    const { windowWidth } = useOutletContext<YoutubeProps>();
    const { loggedIn } = useOutletContext<YoutubeProps>();

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
                    windowWidth: windowWidth,
                    loggedIn: loggedIn,
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
    @media screen and (max-width: 650px) {
        display: grid;
    }
`;