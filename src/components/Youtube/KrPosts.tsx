import { useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import { PostsBox, Writin, PostsHeader, Title, PostsBody } from './YoutubeStyled';
import Search from "../Common/Search";
import { ArrayProps, YoutubeProps } from "./YoutubeProps";
import Pagination from "../Common/Pagination";

function KrPosts() {
    const { krData } = useOutletContext<ArrayProps>();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(10); // 한 페이지당 보여질 게시물 수
    const { loggedIn } = useOutletContext<YoutubeProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<ArrayProps>(); // 검색 결과를 저장할 배열

    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        // 검색 결과가 있다면 검색 결과를 사용하고, 없다면 postsDate를 사용
        const targetPosts = searchResult ? searchResult.postsData : krData;
        return targetPosts.slice(startIndex, endIndex);
    };
    
    return(
        <PostsBox>
            {loggedIn && <Writin to="/youtube/kr-post/writin" >글 작성</Writin> }
            <PostsHeader>
                <Title>한국</Title>
                <Search
                    postsData={krData}
                    searchQuery={searchQuery}
                    searchResult={searchResult}
                    setSearchQuery={setSearchQuery}
                    setSearchResult={setSearchResult}
                 />
            </PostsHeader>
            <PostsBody>
                {searchResult ? (
                    searchResult.postsData.map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/kr/${obj.postId}`}>
                            <div>제목: {obj.title}</div>
                            <div>
                                <span>말씀: {obj.bibleVerse}</span>
                                <span>{obj.date}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    getPostsForCurrentPage().map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/kr/${obj.postId}`}>
                            <div>제목: {obj.title}</div>
                            <div>
                                <span>말씀: {obj.bibleVerse}</span>
                                <span>{obj.date}</span>
                            </div>
                        </Link>
                    ))
                )}
            </PostsBody>
            <Pagination 
                data={krData}
                arrIndex={null}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </PostsBox>
    );
}

export default KrPosts;