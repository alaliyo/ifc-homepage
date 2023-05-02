import { useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import {
    PostsBox, Writin, PostsHeader, Title,
    PostsBody, PaginationBox, PageNumber, GoBun
} from './YoutubeStyled';
import Search from "./Search";

interface enData { // post 타입
    postId: number;
    title: string;
    url: string;
    date: string;
    bibleVerse:string;
}

interface Props {//객체를 배열로 감쌈
    enData: Array<enData>;
    postsDate: Array<enData>;
}

interface YoutubePostsProps {
    windowWidth: number;
    loggedIn: boolean;
}


function EnPosts() {
    const { enData } = useOutletContext<Props>();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(15); // 한 페이지당 보여질 게시물 수
    const [totalPages] = useState(Math.max(1, Math.ceil(enData.length / postsPerPage))); // 총 페이지 수
    //const { windowWidth } = useOutletContext<YoutubePostsProps>();
    const { loggedIn } = useOutletContext<YoutubePostsProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Props>(); // 검색 결과를 저장할 배열

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 해당하는 게시물들을 필터링하여 가져오는 함수
    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        // 검색 결과가 있다면 검색 결과를 사용하고, 없다면 postsDate를 사용
        const targetPosts = searchResult ? searchResult.postsDate : enData;
        return targetPosts.slice(startIndex, endIndex);
    };
    
    const PostsPageDowon = () => {
        currentPage > 1 && setCurrentPage(e => e -= 1);
    };

    const PostsPageUp = () => {
        currentPage < totalPages && setCurrentPage(e => e += 1);
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
                    searchResult.postsDate.map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/en/${obj.postId}`}>
                        <div>{i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                        </Link>
                    ))
                ) : (
                    getPostsForCurrentPage().map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/en/${obj.postId}`}>
                        <div>{i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                        </Link>
                    ))
                )}
            </PostsBody>
            <PaginationBox>
                {/* 총 페이지 수 계산 */}
                <GoBun onClick={PostsPageDowon}>◀</GoBun>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PageNumber key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                    </PageNumber>
                ))}
                <GoBun onClick={PostsPageUp}>▶</GoBun>
            </PaginationBox>
        </PostsBox>
    );
}

export default EnPosts;