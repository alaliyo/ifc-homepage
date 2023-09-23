import styled, { keyframes } from "styled-components";

export const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const Body = styled.div`
    width: 100%;
    margin-top: 20px;
    animation: ${fadeInAnimation} 0.3s ease-in;

    @media screen and (max-width: 768px) {
        margin-top: 15px;
    }

    @media screen and (max-width: 480px) {
        margin-top: 10px;
    }
`;

export const ChildTitle = styled.h3`
    font-weight: 900;
    text-align: center;
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #c7c7c7; 

    @media screen and (max-width: 768px) {
        font-size: 22px;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 480px) {
        font-size: 20px;
        padding-bottom: 10px;
        margin-bottom: 10px;
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