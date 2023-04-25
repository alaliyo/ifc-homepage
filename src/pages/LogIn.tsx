import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext, } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query } from "firebase/firestore";
import { dbService } from '../firebase';
import { Button, Form, Stack, Alert } from 'react-bootstrap';
import CrossFades from "../components/generally/CrossFades";
import { PageBody } from './PageStyled';

interface LogInProps { //props 타입
    loggedIn: boolean
}

function LogIn() {
    const [email, setEmail] = useState(""); //아이디
    const [password, setPassword] = useState(""); //비밀번호
    const [errors, setErrors] = useState("") //에러 메세지
    const navigate = useNavigate(); //router v6 페이지 자동 이동
    const { loggedIn } = useOutletContext<LogInProps>(); //로그인 확인 여부
    const [chack, setChack] = useState(false); //페이지 이동 인증 

    //admin 이이디, 비말번호 받음 
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const {
            target: { name, value },
        } = e;
        
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    // 로그인 시도
    const onSubmit = async(e: React.FormEvent) => { 
        e.preventDefault();
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/')
        } catch (error: any) {
            const message = error.message;
            if (message === "Firebase: Error (auth/invalid-email).") {
                setErrors("아이디를 이메일 형태로 입력해주세요");
            } else if (message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setErrors("비밀번호를 6자리 이상 입력해 주세요");
            } else if (message === "Firebase: Error (auth/email-already-in-use).") {
                setErrors("이미 사용중인 아이디입니다.")
            } else if (message === "Firebase: Error (auth/user-not-found).") {
                setErrors("아이디가 없습니다."); 
            } else if (message === "Firebase: Error (auth/wrong-password).") {
                setErrors("비밀번호를 다시 확인해주세.")
            }
        }
    };
    
    // 로그인 페이지 접속 시 인증 및 중복 로그인 막기
    useEffect(() => { 
        if (loggedIn) {
            alert('이미 로그인 되어 있습니다.')
            navigate('/');
            return;
        }
        
        if (chack) {
            return;
        }
    
        const answer = prompt('관리자 로그인입니다. 인증번호를 입력해주세요', "");
        
        //DB 인증 값 가져오기
        const checkCertification = async () => { 
            const q = query(
                collection(dbService, "admin"),
            );
            const snapshot = await getDocs(q);
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            const certification = postsArr[0].password;
            if (certification === answer) {
                setChack(true);
                navigate('/login');
            } else {
                alert("인증 번호가 틀렸습니다. 제작자에게 문의하세요")
                navigate('/');
            }
        }
        
        if (answer == null || answer === '') {
            alert("인증 번호가 틀렸습니다. 제작자에게 문의하세요")
            navigate('/');
        } else (
            checkCertification()
        )
    }, [navigate, chack, loggedIn]);

    return(
        <PageBody>
            <CrossFades />
            <LogInBox>
                <Form onSubmit={onSubmit}>
                    <LoginTitle>로그인</LoginTitle>
                    <Explanation>이 페이지는 관리자를 위한 로그인 페이지 입니다.</Explanation>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control name="email" type="email" placeholder="아이디를 입력해주세요." required value={email} onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control name="password" type="password" placeholder="비밀번호를 입력해주세요." required value={password} onChange={onChange} />
                    </Form.Group>
                    
                    <Stack direction="horizontal">
                        <Button className='ms-auto' variant="light" type="submit" >로그인</Button>
                    </Stack>
                    {errors !== '' && <Alert variant="danger">{errors}</Alert>}
                </Form>
            </LogInBox>
        </PageBody>
    );
}

export default LogIn;

const LogInBox = styled.div`
    background-color: rgb(240, 240, 240);
    padding: 50px;
    width: 500px;
    margin: 100px auto;
    border-radius: 20px;
    @media screen and (max-width: 768px) {
        width: 85%;
        margin: 50px auto;
        padding: 15px;
        input {
            width:90%;
        }
    }
`

const LoginTitle = styled.h3`
    @media screen and (max-width: 768px) {
        font-size: 20px;
    }
`

const Explanation = styled.p`
    @media screen and (max-width: 768px) {
        font-size: 13px;
    }
`;