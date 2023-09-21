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