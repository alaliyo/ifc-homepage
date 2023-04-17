import styled, {keyframes} from "styled-components";

const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const PageBody = styled.div`
    width: 100%;
    animation: ${fadeInAnimation} 0.3s ease-in;
`;