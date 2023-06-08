import { addDoc, collection } from 'firebase/firestore';
import { Col, Form, Row, Stack, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { dbService } from '../../firebase';

interface postsData { // 객체 타입
    postId: number;
    title: string;
    date: string;
    detail: string;
    url?: string;
    img?: string;
}

function EventWritin() {
    const { register, handleSubmit, reset } = useForm<postsData>(); // useForm 사용

    //post 추가
    const onSubmit  = async (data: postsData) => {
        try {
            await addDoc(collection(dbService, 'eventData'), {
                ...data
            });
        } catch (error) {
            alert(error);
            return;
        }
        reset(); // form reset
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

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">사진</Form.Label>
                    <Col sm="8">
                        <Form.Control type="file" {...register('img')} />
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