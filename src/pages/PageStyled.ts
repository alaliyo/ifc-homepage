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

export const ChildBox = styled.div`
    width: 1020px;
    margin: 0 auto;
    display: flex;

    @media screen and (max-width: 1020px) {
        margin: 0 0;
        width: 100%;
    }

    @media screen and (max-width: 650px) {
        display: grid;
    }
`;

export const OutletBox = styled.div`
    width: 80%;
    padding: 20px;
    
    @media screen and (max-width: 650px) {
        width: 100%;
        padding: 5px;
    }
`;