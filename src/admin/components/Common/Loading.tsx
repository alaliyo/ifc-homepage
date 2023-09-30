import styled, { keyframes } from "styled-components";

function Loading() {
    return(
        <LoadingrBox>
            <h3>업로드 중</h3>
            <DotStyle animation={DotAnimation1}>•</DotStyle>
            <DotStyle animation={DotAnimation2}>•</DotStyle>
            <DotStyle animation={DotAnimation3}>•</DotStyle>
        </LoadingrBox>
    );
}

export default Loading;

const LoadingrBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DotAnimation1 = keyframes`
    0%, 30% {
        transform: translateY(0);
    }
    15% {
        transform: translateY(-10px);
    }
`;

const DotAnimation2 = keyframes`
    15%, 45% {
        transform: translateY(0);
    }
    30% {
        transform: translateY(-10px);
    }
`;

const DotAnimation3 = keyframes`
    30%, 60% {
        transform: translateY(0);
    }
    45% {
        transform: translateY(-10px);
    }
`;

const DotStyle = styled.div<{ animation: any }>`
    width: 10px;
    font-weight: 900;
    margin-left: 5px;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-name: ${({ animation }) => animation};
`;