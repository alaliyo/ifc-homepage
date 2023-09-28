import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Body, ChildTitle } from "../Common/CommonStyled";
import { CertificationData, WeekDataArrayPoops, WeeklyData } from "../../utils/dbService";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

export interface DataProps {
    getData: WeekDataArrayPoops[];
    arrIndex: number;
    setArrIndex: any;
};

function Weekly() {
    const weeklyData = WeeklyData();
    const certificationData = CertificationData();
    const [arrIndex, setArrIndex] = useState(0);
    const [certification, setCertification] = useState("");
    const [certificationBoolen, setCertificationBoolen] = useState(false);
    const storedCertification = localStorage.getItem("weekly-certification");
    const navigate = useNavigate();

    useEffect(() => {
        if (certificationData && storedCertification) {
            if (storedCertification === certificationData.find(e => e.id === "weekly")?.password) {
                setCertificationBoolen(true);
            } else {
                alert("인증번호가 다릅니다. 교회에 문의해주세요.");
                localStorage.removeItem("weekly-certification");
                navigate("/schedule/weekly/list");
            }
        } 
    }, [certificationData, navigate, storedCertification]);

    const onChange = (e: any) => {
        setCertification(e.target.value);
    }

    const handleCertificationSubmit = () => {
        // 인증 번호를 로컬 스토리지에 저장하고 인증 상태를 변경합니다.
        localStorage.setItem("weekly-certification", certification);
    }

    return(
        <Body>
            <ChildTitle>주보</ChildTitle>
            
            {certificationBoolen ? (
                <Outlet context={{
                    getData: weeklyData,
                    arrIndex: arrIndex,
                    setArrIndex: setArrIndex,
                }}/>
            ) : (
                <>
                    <FormStyled onSubmit={handleCertificationSubmit}>
                        <InputGroup>
                            <InputGroup.Text >
                                인증
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                value={certification}
                                onChange={onChange}
                            />
                        </InputGroup>
                        <ButtonStyled variant="outline-secondary">
                            완료
                        </ButtonStyled>
                    </FormStyled>
                </>
            )}
        </Body>
    );
}

export default Weekly;

const FormStyled = styled.form`
    width: 400px;
    margin: 50px auto;
    display: flex;

    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

const ButtonStyled = styled(Button)`
    width: 65px;
`;