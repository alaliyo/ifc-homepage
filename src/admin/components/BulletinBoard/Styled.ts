import { ListGroup, Nav } from "react-bootstrap";
import styled from "styled-components";

export const FormBox = styled.form`
    width: 600px;
    margin: 20px auto;
    text-align: end;
`;

export const NavStyled = styled(Nav)`
    width: 80%;
    margin: 0 auto;
`;


export const ListGroupStyled = styled(ListGroup)`
    width: 80%;
    margin: 0 auto;
`;

export const ListGroupItem = styled(ListGroup.Item)`
    display: flex;
    justify-content: space-between;
`;

// 페이징
export const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageNumber = styled.button<{ active: boolean }>`
    border: none;
    background-color: ${(props) => (props.active ? '#adadad' : 'transparent')};
    color: ${(props) => (props.active ? 'white' : 'black')};
    font-weight: 900;
    padding: 5px 10px;
    margin: 0 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;

    :hover {
        background-color: #adadad;
        color: white;
    }

    @media screen and (max-width: 650px) {
        width: 20px;
        height: 20px;
        font-size: 11px;
        padding: 0;
    }
`;

export const GoBun = styled.button`
    border: none;
    background-color: transparent;
    font-weight: 900;
    padding: 5px 10px;
    margin: 0 2px;
    border-radius: 5px;
    transition: 0.3s;
    color: black;

    :hover {
        background-color: #adadad;
        color: white;
    }

    @media screen and (max-width: 650px) {
        width: 20px;
        height: 20px;
        font-size: 11px;
        padding: 0;;
    }
`;
// 여기까지