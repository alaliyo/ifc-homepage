import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import styled from "styled-components";

interface PostProps {
    postId: number;
    title: string;
    detail: string;
    img: string[];
    date: string;
    url: string;
}

interface EventPostProps {
    posts: Array<PostProps>;
}

function EventPostDetail() {
    const { posts } = useOutletContext<EventPostProps>();
    const { postId } = useParams(); // url의 post id 값
    const [post, setPost] = useState<PostProps | undefined>();
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    
    const openModal = (image: string) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const foundPost = posts.find((e) => e.postId === Number(postId));
        if (foundPost) {
            setPost(foundPost);
        }
    }, [posts, postId]);

    return(
        <EventPostDetailBox>
            <ListLink to='/event-story/post'>←목록으로</ListLink>
            {post !== undefined ? (<>
                <DetailHeader>
                    <PostTitle>제목: {post.title}</PostTitle>
                    <PostDate>{post.date}</PostDate>
                </DetailHeader>
                <hr />
                <DetailBody>
                    <DetailText>{post.detail}</DetailText>
                    <br />
                    {post.url && (
                        <DetailIframe
                            width="100%"
                            height="100%"
                            src={post?.url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </DetailIframe>
                    )}

                    {post.img.length > 1 ? (
                        <ImgBox>
                            {post.img.map((e, i) => (
                                <DetailImg key={i} src={e} onClick={() => openModal(e)} />
                            ))}
                            
                        </ImgBox>
                    ) : (
                        <OneImg src={post.img[0]} onClick={() => openModal(post.img[0])} />
                    )}
                </DetailBody>
            </>) : (
                null
            )}
            <ModalStyle show={showModal} onHide={closeModal} centered>
                <ModalHeader closeButton>
                </ModalHeader>
                <img src={selectedImage} alt="이미지 오류 새로고침하세요." />
            </ModalStyle>
        </EventPostDetailBox>
    );
}

export default EventPostDetail;

const EventPostDetailBox = styled.div`
    
`;

const ListLink = styled(Link)`
    color: #3636368d;
    font-weight: 900;
    text-decoration: none;

    @media screen and (max-width: 450px) {
        margin-left: 10px;
    }
`;

const DetailHeader = styled.header`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    p {
        margin-bottom: 5px;
    }

    @media screen and (max-width: 450px) {
        padding: 0 10px;
    }
`

const PostTitle = styled.p`
    font-size: 25px;
    font-weight: 900;

    @media screen and (max-width: 650px){
        font-size: 17px;
    }
`;

const PostDate = styled.p`
    font-size: 18px;
    font-weight: 900;
    color: gray;

    @media screen and (max-width: 650px){
        font-size: 15px;
    }
`;

const DetailBody = styled.div`
    
`;

const ImgBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    @media screen and (max-width: 500px){
        display: block;
    }
`;

const DetailImg = styled.img`
    width: 48%;
    height: 250px;
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
    object-fit: cover;

    @media screen and (max-width: 800px){
        height: 210px;
    }

    @media screen and (max-width: 700px){
        height: 180px;
    }

    @media screen and (max-width: 500px){
        width: 95%;
        height: 250px;
    }
    
    @media screen and (max-width: 400px){
        height: 200px;
    }

    @media screen and (max-width: 350px){
        height: 180px;
    }
`;

const OneImg = styled.img`
    width: 95%;
    margin: 0 auto;
    display: block;
    margin-bottom: 10px;
`;

const DetailText = styled.p`
    margin: 5px 20px;
    font-size: 20px;
    font-weight: 900;
    @media screen and (max-width: 650px){
        font-size: 15px;
    }
`

const DetailIframe = styled.iframe`
    width: 100%;
    height: 400px;
    @media screen and (max-width: 650px) {
        height: 330px;
    }
    @media screen and (max-width: 550px) {
        height: 300px;
    }
    @media screen and (max-width: 400px) {
        height: 200px;
    }
`;

const ModalStyle = styled(Modal)`
    --bs-modal-width: 80%;
`;

const ModalHeader = styled(Modal.Header)`
    position: absolute;
    border-bottom: 0;
    width: 100%;
    float: right;
`;