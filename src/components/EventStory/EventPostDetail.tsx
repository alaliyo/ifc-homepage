import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import styled from "styled-components";
import { DataProps } from './EventStoryType';
import { EventStoryDataProps } from '../../utils/dbService';

function EventPostDetail() {
    const { getData, arrIndex } = useOutletContext<DataProps>();
    const { postId } = useParams(); // url의 post id 값
    const [post, setPost] = useState<EventStoryDataProps>();
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
        if (getData) {
            const foundPost = getData[arrIndex].contentsArr.find((e) => e.id === Number(postId));
            if (foundPost) {
                setPost(foundPost);
            }
        }
    }, [arrIndex, getData, postId]);

    return(
        <div>
            <ListLink to='/event-story/post'>←목록으로</ListLink>
            {post && (
                <>
                    <DetailHeader>
                        <PostTitle>제목: {post.title}</PostTitle>
                        <PostDate>{post.date}</PostDate>
                    </DetailHeader>
                    <hr />
                    <div>
                        {post.content && <DetailText>{post.content}</DetailText>}
                        <br />

                        {post.imgUrls && (
                            <ImgBox>
                                {post.imgUrls.map((e, i) => (
                                    <DetailImg key={i} src={e} onClick={() => openModal(e)} />
                                ))}
                                
                            </ImgBox>
                        )}
                    </div>
                </>
            )}
            <ModalStyle show={showModal} onHide={closeModal} centered>
                <ModalHeader closeButton>
                </ModalHeader>
                <img src={selectedImage} alt="이미지 오류 새로고침하세요." />
            </ModalStyle>
        </div>
    );
}

export default EventPostDetail;

const ListLink = styled(Link)`
    color: #3636368d;
    font-weight: 900;
    text-decoration: none;

    @media screen and (max-width: 480px) {
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

    @media screen and (max-width: 480px) {
        padding: 0 10px;
    }
`

const PostTitle = styled.p`
    font-size: 25px;
    font-weight: 900;

    @media screen and (max-width: 768px){
        font-size: 17px;
    }
`;

const PostDate = styled.p`
    font-size: 18px;
    font-weight: 900;
    color: gray;

    @media screen and (max-width: 768px){
        font-size: 15px;
    }
`;

const ImgBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    @media screen and (max-width: 480px){
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

    @media screen and (max-width: 7680px){
        height: 210px;
    }

    @media screen and (max-width: 700px){
        height: 180px;
    }

    @media screen and (max-width: 600px){
        height: 160px;
    }

    @media screen and (max-width: 480px){
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

const DetailText = styled.p`
    margin: 5px 20px;
    font-size: 20px;
    font-weight: 900;

    @media screen and (max-width: 768px){
        font-size: 15px;
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