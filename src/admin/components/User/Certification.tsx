import { Button, Form, InputGroup } from "react-bootstrap";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox } from "../BulletinBoard/Styled";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase";
import { useState } from "react";

function Certification() {
    const [certification, setCertification] = useState("");
    
    const onChange = (e: any) => {
        setCertification(e.target.value);
    }

    // PUT
    const CertificationPut = async (e: any) => {
        e.preventDefault();

        try {
            const yearDocRef = doc(dbService, "certification", "weekly");
            await updateDoc(yearDocRef, {
                password: certification,
            });
            alert("수정이 완료되었습니다.");
            setCertification("");
        } catch (error) {
            return alert("새로고침 후 다시 시도해주세요" + error);
        }
    };
    
    return(
        <div>
            <ChildTitle>인증</ChildTitle>

            <FormBox onSubmit={CertificationPut}>
                <InputGroup>
                    <InputGroup.Text >
                        인증번호
                    </InputGroup.Text>
                    <Form.Control
                        type="password"
                        value={certification}
                        onChange={onChange}
                    />
                </InputGroup>
                <br />
                <Button variant="outline-secondary">
                    수정
                </Button>
            </FormBox>
        </div>
    )
}

export default Certification;