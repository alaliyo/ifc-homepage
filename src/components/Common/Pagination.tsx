import { useEffect, useState } from "react";
import { GoBun, PageNumber, PaginationBox } from "./CommonStyled";

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
            
            if (data[arrIndex].contentsArr !== undefined) {
                if (data[arrIndex].contentsArr && data[arrIndex].contentsArr.length > 0) {
                    totalDataLength = data[arrIndex].contentsArr.length;
                }
            } else {
                totalDataLength = data.length;
            }
            console.log(totalDataLength, arrIndex)
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
                    active={i + 1 === currentPage}
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
