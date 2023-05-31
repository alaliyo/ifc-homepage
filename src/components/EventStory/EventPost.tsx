import styled from "styled-components";
import PostCard from "./PostCard";

function EventPost() {
    return(
        <div>
            <PostsHeader>
                <Title>게시물</Title>
            </PostsHeader>
            <CardsBox>
                <PostCard />
            </CardsBox>
        </div>
    );
}

export default EventPost;

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
    padding: 10px;
`;
