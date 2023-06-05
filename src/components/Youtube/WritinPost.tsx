import { useState } from 'react';
import { useOutletContext, useNavigate, useMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from "firebase/firestore";
import { dbService } from '../../firebase';
import { Col, Form, Row, Stack, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useEffect } from 'react';

interface postsData { // 객체 타입
    postId: number;
    title: string;
    url: string;
    date: string;
    bibleVerse: string;
}

interface WritinProps { // 객체를 배열로 감쌈
    enData: Array<postsData>;
    krData: Array<postsData>;
    loggedIn: boolean;
}

function WritinPost() {
    const { krData, enData } = useOutletContext<WritinProps>(); // 데이터 배열
    const [postMaxId, setPostMaxId] = useState(0); // 데이터 길이
    const { register, handleSubmit, reset } = useForm<postsData>(); // useForm 사용
    const { loggedIn } = useOutletContext<WritinProps>(); //admin 로그인 여부
    const navigate = useNavigate();
    const match = useMatch('/youtube/kr-post/writin');
    const currentUrl = match?.pathname || '/youtube/en-post/writin';
    const [urlChank, setUrlChank] = useState('');
    
    //post 추가
    const onSubmit  = async (data: postsData) => {
        try {
            await addDoc(collection(dbService, urlChank), {
                ...data,
                postId: postMaxId,
            });
        } catch (error) {
            alert(error);
            return;
        }
        reset(); // form reset
        alert('작성 완료되었습니다.');
        navigate(urlChank === 'youtobe-kr-posts' ? '/youtube/kr-posts' : '/youtube/en-posts');
    }

    // 작성 접근 시 로그인 여부로 막음
    useEffect(() => {
        if (loggedIn === false) {
            alert('관리자 권한 페이지입니다. 권한 관련은 제작자에게 문의하세요');
            navigate('/');
        }
    }, [loggedIn, navigate, urlChank])

    // 작성글 추가 시 길이 변경
    useEffect(() => {
        setPostMaxId(urlChank === 'youtobe-kr-posts'
            ? Math.max(...krData.map(e => e.postId)) + 1
            : Math.max(...enData.map(e => e.postId)) + 1
        )
    }, [enData, krData, urlChank]);

    useEffect(() => {
        setUrlChank(currentUrl === '/youtube/kr-post/writin' ? 'youtobe-kr-posts' : 'youtobe-en-posts');
    }, [currentUrl])
    console.log(postMaxId);
    return(
        <WritinPostBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        제목
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="영상 제목"
                            {...register('title')}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        날짜
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="예)23.01.01"
                            {...register('date')}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        말씀
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                        type="text"
                        placeholder="예) 요 1:1; 마 1:1"
                        {...register('bibleVerse')}
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="1">
                        url
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="영상 url 퍼가기에 있음"
                            {...register('url')}
                        />
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

export default WritinPost;

const WritinPostBody = styled.div`
    width: 100%;
    padding: 20px;
`;