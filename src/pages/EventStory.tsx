import { OutletBox, PageBody } from "./PageStyled";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";
import styled from "styled-components";

function EventStory() {
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
            setPosts(postsArr);
        });
    }, []);

    return(
        <PageBody>
            <OutletBoxstyle>
                <Outlet context={{
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

    @media screen and (max-width: 650px) {
        padding: 15px;
    }

    @media screen and (max-width: 450px) {
        padding: 15px 0;
    }
`;