import styled from "styled-components";
import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "../Common/Search";
import { useState } from "react";

interface PostProps {
    postId: number;
    title: string;
    img: string;
    date: string;
}

interface EventPostProps {
    loggedIn: boolean;
    posts: Array<PostProps>;
    postsData: Array<PostProps>;
}

function EventPost() {
    const { loggedIn } = useOutletContext<EventPostProps>();
    const { posts } = useOutletContext<EventPostProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<EventPostProps | undefined>(); // 검색 결과를 저장할 배열
    
    const getPostsForCurrentPage = () => {
        const targetPosts = searchResult ? searchResult.postsData : posts;
        return targetPosts;
    };

    return(
        <div>
            {loggedIn && <Writin to="writin">글 작성</Writin>}
            <PostsHeader>
                <Title>게시물</Title>
                <Search
                    postsData={posts}
                    searchQuery={searchQuery}
                    searchResult={searchResult}
                    setSearchQuery={setSearchQuery}
                    setSearchResult={setSearchResult}
                 />
            </PostsHeader>
            <CardsBox>
                {searchResult ? (
                    getPostsForCurrentPage().map((e, i) => (
                        <PostCard
                            key={i}
                            post={e}
                            num={i}
                        />
                    ))
                ):(
                    posts.map((e, i) => (
                        <PostCard
                            key={i}
                            post={e}
                            num={i}
                        />
                    ))
                )}
                
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
    @media screen and (max-width: 650px){
        padding: 5px;
    }
`;
