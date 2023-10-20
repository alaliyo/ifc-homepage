import styled from "styled-components";
import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "../Common/Search";
import { useState } from "react";
import { EventStoryDataProps } from "../../utils/dbService";
import { DataProps } from "./EventStoryType";
import { ChildTitle, NavBox, NavItem } from "../Common/CommonStyled";
import Pagination from "../Common/Pagination";

function EventPosts() {
    const { getData, arrIndex, setArrIndex } = useOutletContext<DataProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
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
    const handleSearch = (searchQuery: string) => {
        if (searchQuery && searchQuery.length > 0) {
            const filteredData = getData.flatMap((obj: any) =>
                obj.contentsArr.filter((item: { title: string; date: string; }) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.date.toLowerCase().includes(searchQuery)
                )
            );
            setSearchResult(filteredData);
        } else {
            setSearchResult(undefined);
        }
        setCurrentPage(1);
    };
    
    return(
        <div>
            <ChildTitle>게시물</ChildTitle>
            <Search handleSearch={handleSearch} />

            <NavBox>
                {getData && !searchResult && getData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date} ~ {Number(obj.date) + 4}</NavItem>
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
        </div>
    );
}

export default EventPosts;

export const Writin = styled(Link)`
    color: black;
    font-weight: 900;
    text-decoration: none;
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
