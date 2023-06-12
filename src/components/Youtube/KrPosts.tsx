import { useEffect, useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import {
    PostsBox, Writin, PostsHeader, Title,
    PostsBody, PaginationBox, PageNumber, GoBun
} from './YoutubeStyled';
import Search from "../Common/Search";

interface krData { // post 타입
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse:string,
}

interface Props {
    postsData: Array<krData>; //객체를 배열로 감쌈
    krData: Array<krData>
}

interface YoutubePostsProps {
    windowWidth: number;
    loggedIn: boolean;
}


function KrPosts() {
    const { krData } = useOutletContext<Props>();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(15); // 한 페이지당 보여질 게시물 수
    const [totalPages, setTotalPages] = useState(Math.max(1, Math.ceil(krData.length / postsPerPage))); // 총 페이지 수
    //const { windowWidth } = useOutletContext<YoutubePostsProps>();
    const { loggedIn } = useOutletContext<YoutubePostsProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Props>(); // 검색 결과를 저장할 배열

    // 페이지 수 계산 함수
    const calculateTotalPages = () => {
        const totalPages = Math.max(1, Math.ceil(krData.length / postsPerPage));
        setTotalPages(totalPages);
    };

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        calculateTotalPages();
    }, [krData]);

    // 현재 페이지에 해당하는 게시물들을 필터링하여 가져오는 함수
    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        // 검색 결과가 있다면 검색 결과를 사용하고, 없다면 postsDate를 사용
        const targetPosts = searchResult ? searchResult.postsData : krData;
        
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
                        <div>{(currentPage - 1) * 15 + i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                        </Link>
                    ))
                ) : (
                    getPostsForCurrentPage().map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/kr/${obj.postId}`}>
                        <div>{(currentPage - 1) * 15 + i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                        </Link>
                    ))
                )}
            </PostsBody>
            <PaginationBox>
                {/* 총 페이지 수 계산 */}
                <GoBun onClick={PostsPageDowon}>◀</GoBun>
                {totalPages > 0 &&
                    Array.from({ length: totalPages }, (_, i) => (
                    <PageNumber
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </PageNumber>
                    ))}
                <GoBun onClick={PostsPageUp}>▶</GoBun>
            </PaginationBox>
        </PostsBox>
    );
}

export default KrPosts;