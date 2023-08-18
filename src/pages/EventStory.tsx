import { OutletBox, PageBody } from "./PageStyled";
import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";
import styled from "styled-components";

interface EventProps {
    loggedIn: boolean;
}

function EventStory() {
    const { loggedIn } = useOutletContext<EventProps>();
    const [posts, setPosts] = useState([]);

    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, "eventData"),
            orderBy("date", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setPosts(postsArr.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id));
        });
    }, [])

    return(
        <PageBody>
            <OutletBoxstyle>
                <Outlet context={{
                    loggedIn: loggedIn,
                    posts: posts,
                }} />
            </OutletBoxstyle>
        </PageBody>
    );
}

export default EventStory;

const OutletBoxstyle = styled(OutletBox)`
    width: 1000px;
    margin: 0 auto;
    padding: 20px;

    @media screen and (max-width: 1017px) {
        width: auto;
    }
`;