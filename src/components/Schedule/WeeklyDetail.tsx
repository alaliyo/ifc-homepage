import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { DataProps } from "./Weekly";
import { WeekDataPoops } from "../../utils/dbService";
import styled from "styled-components";

function WeeklyDetail() {
    const { getData, arrIndex } = useOutletContext<DataProps>();
    const { postId } = useParams();
    const [post, setPost] = useState<WeekDataPoops>();
    
    useEffect(() => {
        if (getData) {
            setPost(getData[arrIndex].contentsArr.find(e => e.id === Number(postId)));
        }
    }, [arrIndex, getData, postId])
    
    return(
        <div>
            {post && (
                <>
                    <PostTitle>{post.date} 주보</PostTitle>
                    {post.imgUrls.map(url => (
                        <PostImg src={url} alt="새로고침" />
                    ))}
                </>
            )}
        </div>
    )
}

export default WeeklyDetail;

const PostTitle = styled.h4`
    text-align: center;
`;

const PostImg = styled.img`
    width: 90%;
    margin: 0 auto 20px auto;
    display: block;

    @media screen and (max-width: 768px) {
        width: 95%;
    }
`;