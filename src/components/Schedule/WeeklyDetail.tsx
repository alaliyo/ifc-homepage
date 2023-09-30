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

    const onClickPage = (url: string) => {
        window.open(url, '_blank');
    }
    
    return(
        <div>
            {post && (
                <>
                    <PostTitle>{post.date} 주보</PostTitle>
                    <br />
                    <h5>한국</h5>
                    <PostImgBox>
                        {post.imgUrls.slice(2, 4).map((url, i) => (
                            <PostImg
                                key={i}
                                src={url}
                                onClick={() => onClickPage(url)}
                                alt="새로고침"
                            />
                        ))}
                    </PostImgBox>
                    <br />
                    <br />
                    <h5>외국</h5>
                    <PostImgBox>
                        {post.imgUrls.slice(0, 2).map((url, i) => (
                            <PostImg
                                key={i}
                                src={url}
                                onClick={() => onClickPage(url)}
                                alt="새로고침"
                            />
                        ))}
                    </PostImgBox>
                </>
            )}
        </div>
    )
}

export default WeeklyDetail;

const PostTitle = styled.h4`
    text-align: center;
`;

const PostImgBox = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
`;

const PostImg = styled.img`
    width: 100%;
    margin: 0 20px;
    cursor: pointer;
`;