import styled from "styled-components";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../../firebase";
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { ScheduleDataPoops } from "../../utils/dbService";

function ScheduleWrite() {
    const { register, handleSubmit, reset } = useForm<ScheduleDataPoops>(); // useForm 사용

    // 게시물 post 
    const onSubmit = async (data: ScheduleDataPoops) => {
        try {
            await addDoc(collection(dbService, 'schedules'), {
                ...data
            });
        } catch (error) {
            alert(error);
            return;
        }

        reset(); // form reset
    };

    return(
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    type="text"
                    placeholder="제목"
                    {...register('title')}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    type="date"
                    placeholder="날짜"
                    {...register('date')}
                />
            </Form.Group>
            <Button type="submit" variant="outline-secondary" size="sm">완료</Button>
        </FormStyled>
    );
}

export default ScheduleWrite;

const FormStyled = styled(Form)`
    width: 300px;
    margin: 0 auto;
`;