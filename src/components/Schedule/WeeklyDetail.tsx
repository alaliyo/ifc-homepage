import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { DataProps } from "./Weekly";
import { WeeklyDataPoops } from "../../utils/dbService";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";

function WeeklyDetail() {
    const { getData, arrIndex } = useOutletContext<DataProps>();
    const { postId } = useParams();
    const [post, setPost] = useState<WeeklyDataPoops>();
    
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
                    <h5>한국 주보</h5>
                    <Carousel variant="dark">
                        {post.imgUrls.slice(2, 4).map((url, i) => (
                            <Carousel.Item key={i} interval={50000}>
                                <PostImg
                                    key={i}
                                    src={url}
                                    onClick={() => onClickPage(url)}
                                    alt="새로고침"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <br />
                    <br />
                    <h5>English bulletin</h5>
                    <Carousel variant="dark">
                        {post.imgUrls.slice(0, 2).map((url, i) => (
                            <Carousel.Item key={i} interval={50000}>
                                <PostImg
                                    key={i}
                                    src={url}
                                    onClick={() => onClickPage(url)}
                                    alt="새로고침"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
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
    width: 100%;
    margin: 0 20px;
    cursor: pointer;
`;