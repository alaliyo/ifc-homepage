import { Spinner } from "react-bootstrap";
import styled from "styled-components";

function CommonSpinner() {
    return(
        <SpinnerBox>
            <Spinner animation="border" variant="secondary" />
        </SpinnerBox>
    );
}

export default CommonSpinner;

const SpinnerBox = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 20%;
`