import { useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import { PostsBox, PostsHeader, Title, PostsBody} from './YoutubeStyled';
import Search from "../Common/Search";
import Pagination from "../Common/Pagination";
import { NavBox, NavItem } from "../Common/CommonStyled";
import { YoutubeDataArrayProps } from "../../utils/dbService";

interface DateProps {
    getData: YoutubeDataArrayProps[]
};

function EnPosts() {
    const { getData } = useOutletContext<DateProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<YoutubeDataArrayProps[] | undefined>(); // 검색 결과를 저장할 배열
    const [arrIndex, setArrIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (getData && getData.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = getData[arrIndex].contentsArr.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
            return DataSort.slice(startIndex, endIndex);
        }
        return [];
    }; 

    const arrIndexChange = (i: number) => {
        setArrIndex(i)
    };
    
    return(
        <PostsBox>
            <PostsHeader>
                <Title>영어</Title>
                {/* 
                <Search
                    postsData={getData}
                    searchQuery={searchQuery}
                    searchResult={searchResult}
                    setSearchQuery={setSearchQuery}
                    setSearchResult={setSearchResult}
                />
                */}
            </PostsHeader>

            <NavBox>
                {getData && getData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date}</NavItem>
                ))}
            </NavBox>
            
            <PostsBody>
                {getPostsForCurrentPage().map((obj, i) => (
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
                data={getData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </PostsBox>
    );
}

export default EnPosts;