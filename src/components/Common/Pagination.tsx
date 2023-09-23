import { useEffect, useState } from "react";
import { GoBun, PageNumber, PaginationBox } from "./CommonStyled";

function Pagination({ data, arrIndex, currentPage, setCurrentPage, postsPerPage } : any) {
    const [totalPages, setTotalPages] = useState(1);
    
    const calculateTotalPages = () => {
        if (data && arrIndex !== null) {
            const totalPages = Math.max(1, Math.ceil(data[arrIndex].contentsArr.length / postsPerPage));
            setTotalPages(totalPages);
        } else if (data) {
            const totalPages = Math.max(1, Math.ceil(data.length / postsPerPage));
            setTotalPages(totalPages);
        }
    };
    
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        calculateTotalPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, arrIndex]);
    
    const PostsPageDowon = () => {
        currentPage > 1 && setCurrentPage((e: number) => e -= 1);
    };

    const PostsPageUp = () => {
        currentPage < totalPages && setCurrentPage((e: number) => e += 1);
    };
    // 페이징 끝

    return (
        <PaginationBox>
            <GoBun onClick={PostsPageDowon}>◀</GoBun>
            {Array.from({ length: totalPages }, (_, i) => (
                <PageNumber key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                </PageNumber>
            ))}
            <GoBun onClick={PostsPageUp}>▶</GoBun>
        </PaginationBox>
    );
};

export default Pagination;