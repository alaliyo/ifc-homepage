import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Form, Stack, Alert } from 'react-bootstrap';
import { authService } from "../../firebase";

function Login() {
    const [email, setEmail] = useState(""); //아이디
    const [password, setPassword] = useState(""); //비밀번호
    const [errors, setErrors] = useState("") //에러 메세지
    const navigate = useNavigate();

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
            navigate('/admin/home');
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

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(user => {
            if (user) {
                navigate('/admin/home');
            }
        });

        // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
        return () => unsubscribe();
    }, [navigate]);

    return(
        <div>
            <LogInBox>
                <Form onSubmit={onSubmit}>
                    <ChurchNameBox>IFC 열방교회</ChurchNameBox>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FormLabel>아이디</FormLabel>
                        <Form.Control name="email" type="email" placeholder="아이디를 입력해주세요." required value={email} onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FormLabel>비밀번호</FormLabel>
                        <Form.Control name="password" type="password" placeholder="비밀번호를 입력해주세요." required value={password} onChange={onChange} />
                    </Form.Group>
                    
                    <Stack direction="horizontal">
                        <Button className='ms-auto' variant="light" type="submit" >로그인</Button>
                    </Stack>
                    {errors !== '' && <Alert variant="danger">{errors}</Alert>}
                </Form>
            </LogInBox>
        </div>
    )
}

export default Login;

const LogInBox = styled.div`
    color: white;
    background-color: rgb(73, 73, 73);
    padding: 20px;
    width: 400px;
    margin: 30vh auto 0 auto;

    @media screen and (max-width: 480px) {
        width: 100%;

        input {
            font-size: 14px;
            width:100%;
        }

    }
`;

const ChurchNameBox = styled.p`
    color: white;
    font-size: 20px;
`;

const FormLabel = styled(Form.Label)`
    
    @media screen and (max-width: 480px) {
        font-size: 15px;
    }
`