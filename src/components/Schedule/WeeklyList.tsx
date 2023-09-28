import { Link, useOutletContext } from "react-router-dom";
import { WeekDataPoops } from "../../utils/dbService";
import { useState } from "react";
import { DataProps } from "./Weekly";
import Search from "../Common/Search";
import { NavBox, NavItem } from "../Common/CommonStyled";
import { PostsBody } from "../Youtube/YoutubeStyled";
import Pagination from "../Common/Pagination";
import styled from "styled-components";

function WeeklyList() {
    const { getData, arrIndex, setArrIndex } = useOutletContext<DataProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<WeekDataPoops[] | undefined>(undefined);
    
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
            item.date.toLowerCase().includes(searchQuery)
        );
        setSearchResult(filteredData);
        setCurrentPage(1);
    };

    return(
        <div>
            <SearchBox>
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                />
            </SearchBox>
            <NavBox>
                {getData && getData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date}</NavItem>
                ))}
            </NavBox>
            
            <PostsBody>
                {getData && getData.length > 0 && getPostsForCurrentPage().map((obj, i) => (
                    <Link key={i} to={`/schedule/weekly/${obj.id}`}>
                        {i+1}. {obj.date} 주보
                    </Link>
                ))}
            </PostsBody>
            <Pagination 
                data={searchResult && searchResult.length > 0 ? searchResult :  getData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </div>
    )
}

export default WeeklyList;

const SearchBox = styled.div`
    display: flex;
    justify-content: center;
`;