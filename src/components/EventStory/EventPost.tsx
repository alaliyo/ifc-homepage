import styled from "styled-components";
import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router-dom";

interface EventPostProps {
    loggedIn: boolean;
}

function EventPost() {
    const { loggedIn } = useOutletContext<EventPostProps>();

    return(
        <div>
            {loggedIn && <Writin to="writin">글 작성</Writin>}
            <PostsHeader>
                <Title>게시물</Title>
            </PostsHeader>
            <CardsBox>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
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
