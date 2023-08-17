import { ChildBox, OutletBox, PageBody } from "./PageStyled";
import { Outlet, useOutletContext } from "react-router-dom";
import PageNav from "../components/Common/PageNav";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";

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
            <ChildBox>
                <PageNav
                    title="행사"
                    LinkInfo={[
                        {
                            title1: '행사',
                            LinkUrl: '/event-story/post',
                        },
                    ]}
                />
                <OutletBox>
                    <Outlet context={{
                        loggedIn: loggedIn,
                        posts: posts,
                    }} />
                </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default EventStory;
