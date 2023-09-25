import { InputGroup, ListGroup } from "react-bootstrap";
import styled from "styled-components";

export const FormBox = styled.form`
    width: 600px;
    margin: 20px auto;
    text-align: end;
`;

export const InputGroupCustom = styled(InputGroup)`
    margin-bottom: 10px;
`;

export const NavBox = styled.nav`
    text-align: start;
    height: auto;
    width: 80%;
    border-bottom: 1px solid gray;
    padding: 0;
    margin: auto;
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
`;

export const NavItem = styled.div`
    padding: 10px 15px;
    color: #525252;
    font-size: 17px;
    font-weight: 900; 
    white-space: nowrap;
    cursor: pointer;
`;

export const ListGroupStyled = styled(ListGroup)`
    width: 80%;
    margin: 0 auto;
`;

export const ListGroupItem = styled(ListGroup.Item)`
    display: flex;
    justify-content: space-between;
`;