import styled from "styled-components";
import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "../Common/Search";
import { useState } from "react";

interface PostProps {
    postId: number;
    title: string;
    detail: string;
    img: string;
    date: string;
}

interface EventPostProps {
    loggedIn: boolean;
    posts: Array<PostProps>;
    postsData: Array<PostProps>;
}

function EventPosts() {
    const { loggedIn } = useOutletContext<EventPostProps>();
    const { posts } = useOutletContext<EventPostProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<PostProps[] | undefined>(); // 검색 결과를 저장할 배열
    
    const getPostsForCurrentPage = () => {
        const targetPosts = searchResult ? searchResult : posts;
        return targetPosts;
    };

    // 검색 실행
    const handleSearch = () => {
        const filteredData = posts.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.toLowerCase().includes(searchQuery)
        );
        setSearchResult(filteredData);
    };

    return(
        <>
            {loggedIn && <Writin to="writin">글 작성</Writin>}
            <PostsHeader>
                <Title>게시물</Title>
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                />
            </PostsHeader>
            <CardsBox>
                {posts && posts.length > 0 && getPostsForCurrentPage().map((e: any, i) => (
                    <PostCard
                        key={i}
                        post={e}
                        num={i}
                    />
                ))}
            </CardsBox>
        </>
    );
}

export default EventPosts;

export const Writin = styled(Link)`
    color: black;
    font-weight: 900;
    text-decoration: none;
`;

const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 450px) {
        padding: 0 10px;
    }
`;

const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;

    @media screen and (max-width: 650px) {
        width: 80px;
        font-size: 20px;
    }

    @media screen and (max-width: 450px) {
        width: 60px;
        font-size: 18px;
    }
`;

const CardsBox = styled.div`
    border-top: 2px solid gray;
    padding: 13px;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 650px){
        padding: 5px 0px;
    }

    @media screen and (max-width: 500px){
        display: block;
        padding: 10px 20px;
        display: flex;
        justify-content: center; 
        align-items: center;
    }
`;
