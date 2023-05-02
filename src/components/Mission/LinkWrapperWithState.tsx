import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

interface WrapperProps {
    showMenu: boolean;
}

interface LinkWrapperWithStateProps {
    label: string;
    to: string;
}

function LinkWrapperWithState({ label, to, children }: React.PropsWithChildren<LinkWrapperWithStateProps>) {
    // showMenu 상태값을 useState 훅을 사용하여 초기화합니다.
    const [showMenu, setShowMenu] = useState(false);

    // 마우스 이벤트 핸들러 함수입니다.
    const handleMouseEnter = () => setShowMenu(true);
    const handleMouseLeave = () => setShowMenu(false);

    return (
        // LinkWrapperWithState 컴포넌트의 렌더링 결과입니다.
        <LinkWrapper
            showMenu={showMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Link 컴포넌트입니다. to 속성값은 LinkWrapperWithState 컴포넌트의 label 속성값입니다. */}
            <Link to={to}>{label}</Link>
            {/* LinkWrapperWithState 컴포넌트 내부에 들어갈 자식 요소입니다. */}
            <StyledUl showMenu={showMenu}>{children}</StyledUl>
        </LinkWrapper>
    );
}

export default LinkWrapperWithState;

const LinkWrapper = styled.div<WrapperProps>`
    position: relative;
    cursor: pointer;
`;
  
  const slideDown = keyframes`
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
  
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  
  const StyledUl = styled.ul<WrapperProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin: 0;
    list-style: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: ${slideDown} 0.3s ease-in-out;
    display: ${(props) => (props.showMenu ? "block" : "none")};

    li {
        padding: 7px 0;
        font-weight: 900;
        color: #525252;
        :hover {
            color: #ffffff;
            background-color: #7c7c7c;
            transition: .3s;
        }
    }
  `;