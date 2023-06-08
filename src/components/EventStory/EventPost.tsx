import styled from "styled-components";
import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../firebase";

interface EventPostProps {
    loggedIn: boolean;
}

function EventPost() {
    const { loggedIn } = useOutletContext<EventPostProps>();
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
    }, [])

    return(
        <div>
            {loggedIn && <Writin to="writin">글 작성</Writin>}
            <PostsHeader>
                <Title>게시물</Title>
            </PostsHeader>
            <CardsBox>
                {posts.map((e, i) => (
                    <PostCard
                        key={i}
                        post={e}
                    />
                ))}
                
            </CardsBox>
        </div>
    );
}

export default EventPost;

export const Writin = styled(Link)`
    color: black;
    font-weight: 900;
    text-decoration: none;
`;

const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between; 
`;

const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;
    @media screen and (max-width: 650px) {
        font-size: 20px;
    }
`;

const CardsBox = styled.div`

    border-top: 2px solid gray;
    padding: 13px;
    display: flex;
    flex-wrap: wrap;
`;
