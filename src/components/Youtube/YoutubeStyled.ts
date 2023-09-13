import { Link } from "react-router-dom";
import styled from "styled-components";
import { fadeInAnimation } from "../Common/CommonStyled";

export const PostsBox = styled.div`
    width: 80%;
    padding: 20px;
    animation: ${fadeInAnimation} 0.3s ease-in;
    
    @media screen and (max-width: 650px) {
        width: 100%;
        padding: 5px;
    }
`;

export const Writin = styled(Link)`
    color: black;
    font-weight: 900;
    text-decoration: none;
`;

export const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between; 
`;

export const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;
    @media screen and (max-width: 650px) {
        font-size: 20px;
    }
`;

export const PostsBody = styled.div`
    border-top: 2px solid gray;

    a {
        display: flex;
        text-decoration: none;
        font-weight: 900;
        color: black;
        padding: 5px;
        @media screen and (max-width: 650px) {
            padding: 5px 0;
            font-size: 11px;
        }
        :Hover {
            background-color: #adadad;
            color: white;
            transition: .3s;
            border-radius: 5px;
        }
        div {
            margin-left: 10px;
            @media screen and (max-width: 650px) {
                margin-left: 3px;
            }
        }
    }
    @media screen and (max-width: 650px) {
        border-top: none;
    }
`;

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