import { useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import { PostsBox, PostsBody} from './YoutubeStyled';
import Search from "../Common/Search";
import Pagination from "../Common/Pagination";
import { ChildTitle, NavBox, NavItem } from "../Common/CommonStyled";
import { YoutubeDataProps } from "../../utils/dbService";
import { DateProps } from "./YoutubeProps";

function EnPosts() {
    const { getData, arrIndex, setArrIndex } = useOutletContext<DateProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [searchResult, setSearchResult] = useState<YoutubeDataProps[] | undefined>(undefined);
    
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
                obj.contentsArr.filter((item: { title: string; date: string; bible: string; }) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.date.toLowerCase().includes(searchQuery) || 
                item.bible.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setSearchResult(filteredData);
        } else {
            setSearchResult(undefined);
        }
        setCurrentPage(1);
    };
    
    return(
        <PostsBox>
            <ChildTitle>English</ChildTitle>
            <Search handleSearch={handleSearch} />
            <NavBox>
                {getData && !searchResult && getData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date}</NavItem>
                ))}
            </NavBox>
            
            <PostsBody>
                {getData && getData.length > 0 && getPostsForCurrentPage().map((obj, i) => (
                    <Link key={i} to={`/youtube/detail/en/${obj.id}`}>
                        <div>{obj.title}</div>
                        <div>
                            <span>{obj.bible}</span>
                            <span>{obj.date}</span>
                        </div>
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
        </PostsBox>
    );
}

export default EnPosts;