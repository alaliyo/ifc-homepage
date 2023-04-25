import { useState } from "react";
import styled from "styled-components";
import { Link, useOutletContext } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface postsData { //객체 타입
    postId: number,
    title: string,
    url: string,
    date: string,
    bibleVerse: string,
}

interface Props {//객체를 배열로 감쌈
    postsDate: Array<postsData>
}

interface YoutubePostsProps {
    windowWidth: number;
    loggedIn: boolean;
}

function YoutubePosts() {
    const { postsDate } = useOutletContext<Props>(); //포스트 데이터를 부모에서 받음
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(15); // 한 페이지당 보여질 게시물 수
    const [totalPages] = useState(Math.max(1, Math.ceil(postsDate.length / postsPerPage))); // 총 페이지 수
    const { windowWidth } = useOutletContext<YoutubePostsProps>();
    const { loggedIn } = useOutletContext<YoutubePostsProps>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Props>(); // 검색 결과를 저장할 배열

    // 검색어 상태 갱신
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(e.target.value);
    }; 

    // 검색 버튼 클릭 이벤트 핸들러
    const handleSearchButtonClick = () => {
        // 검색어를 포함하는 데이터 필터링
        const filteredData = postsDate.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.toLowerCase().includes(searchQuery)
        );
        setSearchResult({ postsDate: filteredData }); // 검색 결과를 searchResult 상태값에 저장
    };

    // Enter key를 누르면 여기에서 원하는 작업을 수행할 수 있습니다.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchButtonClick()
        }
    };

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 해당하는 게시물들을 필터링하여 가져오는 함수
    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        // 검색 결과가 있다면 검색 결과를 사용하고, 없다면 postsDate를 사용
        const targetPosts = searchResult ? searchResult.postsDate : postsDate;
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
            {loggedIn && <Writin to="/youtube/writin-post" >글 작성</Writin> }
            
            <PostsHeader>
                {windowWidth > 650 && <Title>목록</Title>}
                
                <InputBox className="mb-3">
                    <Form.Control
                        onChange={handleSearchInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="검색"
                        aria-describedby="basic-addon2"
                    />
                    <Button 
                        onClick={handleSearchButtonClick}
                        variant="outline-secondary"
                        id="button-addon2"
                        size="sm"
                    >
                        ⚲
                    </Button>
                    {searchResult && 
                        <Button
                            onClick={() => setSearchResult(undefined)}
                            variant="outline-secondary"
                            id="button-addon2"
                            size="sm"
                        >전체</Button>
                    }
                </InputBox>
                
            </PostsHeader>
            <PostsBody>
                {searchResult ? (
                    searchResult.postsDate.map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/${obj.postId}`}>
                        <div>{i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                        </Link>
                    ))
                ) : (
                    getPostsForCurrentPage().map((obj, i) => (
                        <Link key={obj.postId} to={`/youtube/detail/${obj.postId}`}>
                        <div>{i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                        </Link>
                    ))
                )}
            </PostsBody>
            <Pagination>
                {/* 총 페이지 수 계산 */}
                <GoBun onClick={PostsPageDowon}>◀</GoBun>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PageNumber key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                    </PageNumber>
                ))}
                <GoBun onClick={PostsPageUp}>▶</GoBun>
            </Pagination>
        </PostsBox>
    );
}

export default YoutubePosts;

const PostsBox = styled.div`
    width: 80%;
    padding: 20px;
    @media screen and (max-width: 650px) {
        width: 100%;
        padding: 5px;
    }
`;

const Writin = styled(Link)`
    color: black;
    font-weight: 900;
    text-decoration: none;
`;

const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between; 
`;

const Title = styled.h3`
    width: 100px;
    @media screen and (max-width: 650px) {
        font-size: 15px;
    }
`;

const InputBox = styled(InputGroup)`
    width: 350px;
    input {
        height: 30px;
    }
    button {
        font-size: 13px;
        font-weight: 900;
        height: 30px;
        padding: 0 15px;
        @media screen and (max-width: 650px) {
            padding: 0 10px;
            font-size: 11px;
        }
    }
    @media screen and (max-width: 650px) {
        padding: 5px 10%;
        width: 100%;
    }
`;

const PostsBody = styled.div`
    border-top: 2px solid gray;
    a {
        display: flex;
        text-decoration: none;
        font-weight: 900;
        color: black;
        padding: 5px;
        @media screen and (max-width: 650px) {
            padding: 5px 0;
            font-size: 11px;
        }
        :Hover {
            background-color: #adadad;
            color: white;
            transition: .3s;
            border-radius: 5px;
        }
        div {
            margin-left: 10px;
            @media screen and (max-width: 650px) {
                margin-left: 3px;
            }
        }
    }
    @media screen and (max-width: 650px) {
        border-top: none;
    }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button<{ active: boolean }>`
    border: none;
    background-color: ${(props) => (props.active ? '#adadad' : 'transparent')};
    color: ${(props) => (props.active ? 'white' : 'black')};
    font-weight: 900;
    padding: 5px 10px;
    margin: 0 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
    :hover {
        background-color: #adadad;
        color: white;
    }
    @media screen and (max-width: 650px) {
        width: 20px;
        height: 20px;
        font-size: 11px;
        padding: 0;
    }
`;

const GoBun = styled.button`
    border: none;
    background-color: transparent;
    font-weight: 900;
    padding: 5px 10px;
    margin: 0 2px;
    border-radius: 5px;
    transition: 0.3s;
    color: black;
    :hover {
        background-color: #adadad;
        color: white;
    }
    @media screen and (max-width: 650px) {
        width: 20px;
        height: 20px;
        font-size: 11px;
        padding: 0;;
    }
`;