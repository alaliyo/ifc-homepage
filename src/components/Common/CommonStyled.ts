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