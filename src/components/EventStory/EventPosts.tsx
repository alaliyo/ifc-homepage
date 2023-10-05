import styled from "styled-components";
import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "../Common/Search";
import { useState } from "react";
import { EventStoryDataProps } from "../../utils/dbService";
import { DataProps } from "./EventStoryType";
import { NavBox, NavItem } from "../Common/CommonStyled";
import Pagination from "../Common/Pagination";

function EventPosts() {
    const { getData, arrIndex, setArrIndex } = useOutletContext<DataProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<EventStoryDataProps[] | undefined>(); // 검색 결과를 저장할 배열
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        const dataToUse = searchResult || (getData && getData[arrIndex]?.contentsArr);
        if (dataToUse && dataToUse.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = dataToUse.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
            return DataSort.slice(startIndex, endIndex);
        }
        return [];
    };

    const arrIndexChange = (i: number) => {
        setArrIndex(i)
    };

    // 검색 실행
    const handleSearch = () => {
        const dataToSearch = getData[arrIndex]?.contentsArr || getData;
        const filteredData = dataToSearch.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.toLowerCase().includes(searchQuery)
        );
        setSearchResult(filteredData);
        setCurrentPage(1);
    };
    
    return(
        <>
            <PostsHeader>
                <Title>게시물</Title>
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                />
            </PostsHeader>

            <NavBox>
                {getData && getData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date} ~ {Number(obj.date) + 5}</NavItem>
                ))}
            </NavBox>
            
            <CardsBox>
                {getData && getPostsForCurrentPage().length > 0 &&
                    getPostsForCurrentPage().map((e: any, i) => (
                        <PostCard
                            key={i}
                            post={e}
                            num={i}
                        />
                    )
                )}
            </CardsBox>

            <Pagination 
                data={searchResult && searchResult.length > 0 ? searchResult :  getData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
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

    @media screen and (max-width: 480px) {
        padding: 0 10px;
    }
`;

const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;

    @media screen and (max-width: 768px) {
        width: 80px;
        font-size: 20px;
    }

    @media screen and (max-width: 480px) {
        width: 60px;
        font-size: 18px;
    }
`;

const CardsBox = styled.div`
    padding: 13px;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 768px){
        padding: 5px 0px;
    }

    @media screen and (max-width: 480px){
        display: block;
        padding: 10px 20px;
        display: flex;
        justify-content: center; 
        align-items: center;
    }
`;
