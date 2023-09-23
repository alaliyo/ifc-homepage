import { useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import { PostsBox, Writin, PostsHeader, Title, PostsBody} from './YoutubeStyled';
import Search from "../Common/Search";
import { ArrayProps, YoutubeProps } from "./YoutubeProps";
import Pagination from "../Common/Pagination";

function EnPosts() {
    const { enData } = useOutletContext<ArrayProps>();
    const { loggedIn } = useOutletContext<YoutubeProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<ArrayProps>(); // 검색 결과를 저장할 배열
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(10); // 한 페이지당 보여질 게시물 수

    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const targetPosts = searchResult ? searchResult.postsData : enData;
        return targetPosts.slice(startIndex, endIndex);
    };
    
    return(
        <PostsBox>
            {loggedIn && <Writin to="/youtube/en-post/writin" >글 작성</Writin> }
            
            <PostsHeader>
                <Title>영어</Title>
                <Search
                    postsData={enData}
                    searchQuery={searchQuery}
                    searchResult={searchResult}
                    setSearchQuery={setSearchQuery}
                    setSearchResult={setSearchResult}
                 />
            </PostsHeader>
            <PostsBody>
                {searchResult ? (
                    searchResult.postsData.map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/en/${obj.postId}`}>
                            <div>Title: {obj.title}</div>
                            <div>
                                <span>Bible: {obj.bibleVerse}</span>
                                <span>{obj.date}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    getPostsForCurrentPage().map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/en/${obj.postId}`}>
                            <div>Title: {obj.title}</div>
                            <div>
                                <span>Bible: {obj.bibleVerse}</span>
                                <span>{obj.date}</span>
                            </div>
                        </Link>
                    ))
                )}
            </PostsBody>
            <Pagination 
                data={enData}
                arrIndex={null}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </PostsBox>
    );
}

export default EnPosts;