import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Col, Form, Row, Stack, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { dbService, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';

interface postsData { // 객체 타입
    title: string;
    date: string;
    detail: string;
    url: string | null;
    img: any;
}

function EventWritin() {
    const { register, handleSubmit, reset } = useForm<postsData>(); // useForm 사용
    const [postsLength, setPostsLength] = useState(0);
    const navigate = useNavigate();

    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, "eventData"),
            orderBy("date", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setPostsLength(postsArr.length);
        });
    }, [])

    const uploadImage = async (images: any, title: string): Promise<any> => {
        const imageUrlPromises: Promise<string>[] = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const storageRef = ref(storage, `images/${title}/${Number(new Date())}_${i}.png`);
            
            try {
                await uploadBytes(storageRef, image);
                const imageUrlPromise = getDownloadURL(storageRef);
                imageUrlPromises.push(imageUrlPromise);
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('이미지 업로드 중 오류가 발생했습니다.');
            }
        }

        const imageUrls = await Promise.all(imageUrlPromises);
        return imageUrls;
    };

      
    //post 추가
    const onSubmit  = async (data: postsData) => {
        try {
            if (!data.title) {
                alert('제목을 입력해주세요.');
                return;
            } else if (!data.date) {
                alert('날짜를 입력해주세요');
                return;
            } else if (!data.detail) {
                alert('내용을 입력해주세요');
                return;
            } else if (data.img && data.img.length > 0 && data.title) {
                const imageUrl = await uploadImage(data.img, data.title);
                data.img = imageUrl;
            }
            
            await addDoc(collection(dbService, 'eventData'), {
                postId: postsLength,
                ...data
            });

            navigate('/event-story/post');
        } catch (error) {
            alert(error);
            return;
        }
        reset();
        alert('작성 완료되었습니다.');
    }
    return(
        <WritinPostBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        제목
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="text" placeholder="제목" {...register('title')}
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        날짜
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="text" placeholder="예)23.01.01" {...register('date')} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        내용
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="text" as='textarea' placeholder="내용" {...register('detail')} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        url
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="영상 url 퍼가기에 있음" {...register('url')} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formFileMultiple" className="mb-3">
                    <Form.Label column sm="1">사진</Form.Label>
                    <Col sm="8">
                        <Form.Control type="file" {...register('img')} multiple />
                    </Col>
                </Form.Group>
                <br />

                <Stack direction="horizontal">
                    <Button className='ms-auto' variant="light" type="submit" >작성 완료</Button>
                </Stack>
            </Form>
        </WritinPostBody>
    );
}

export default EventWritin;

const WritinPostBody = styled.div`
    width: 100%;
    padding: 20px;
`;