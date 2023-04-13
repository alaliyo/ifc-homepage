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

interface WindowSize {
    windowWidth: number
}

function YoutubePosts() {
    const { postsDate } = useOutletContext<Props>(); //포스트 데이터를 부모에서 받음
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(15); // 한 페이지당 보여질 게시물 수
    const [totalPages] = useState(Math.max(1, Math.ceil(postsDate.length / postsPerPage))); // 총 페이지 수
    const { windowWidth } = useOutletContext<WindowSize>();

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 해당하는 게시물들을 필터링하여 가져오는 함수
    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return postsDate.slice(startIndex, endIndex);
    };
    
    const PostsPageDowon = () => {
        currentPage > 1 && setCurrentPage(e => e -= 1);
    };

    const PostsPageUp = () => {
        currentPage < totalPages && setCurrentPage(e => e += 1);
    };

    return(
        <PostsBox>
            <PostsHeader>
                {windowWidth > 650 && <Title>목록</Title>}
                {/*
                <InputBox className="mb-3">
                    <Form.Control
                    placeholder="검색"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" size="sm">
                        ⚲
                    </Button>
                </InputBox>
                */}
            </PostsHeader>
            <PostsBody>
                {getPostsForCurrentPage().map((obj, i) => (
                    <Link key={obj.postId} to={`/youtube/detail/${obj.postId}`}>
                        <div>{i + 1}</div>
                        <div>{obj.date}</div>
                        <div>{obj.title}</div>
                    </Link>
                ))}
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
    width: 300px;
    input {
        height: 30px;
    }
    button {
        font-size: 15px;
        font-weight: 900;
        height: 30px;
        padding: 0 15px;
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