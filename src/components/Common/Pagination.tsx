import { useEffect, useState } from "react";
import styled from "styled-components";

function Pagination({ 
    data,
    arrIndex,
    currentPage,
    setCurrentPage,
    postsPerPage
} : any) {
    const [totalPages, setTotalPages] = useState(1);
    
    const calculateTotalPages = () => {
        if (data && data.length > 0) {
            let totalDataLength = 0;
            
            if (data && data[arrIndex] && data[arrIndex].contentsArr) {
                totalDataLength = data[arrIndex].contentsArr.length;
            } else {
                totalDataLength = data.length;
            }
            
            const totalPages = Math.max(1, Math.ceil(totalDataLength / postsPerPage));
            setTotalPages(totalPages);
        } else {
            setTotalPages(1);
        }
    };
    
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        calculateTotalPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, arrIndex, postsPerPage]);

    const PostsPageDowon = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const PostsPageUp = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <PaginationBox>
            <GoBun onClick={PostsPageDowon}>◀</GoBun>
            {Array.from({ length: totalPages }, (_, i) => (
                <PageNumber
                    key={i + 1}
                    active={i + 1 === currentPage ? 1 : 0}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </PageNumber>
            ))}
            <GoBun onClick={PostsPageUp}>▶</GoBun>
        </PaginationBox>
    );
}

export default Pagination;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button<{ active: number }>`
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
