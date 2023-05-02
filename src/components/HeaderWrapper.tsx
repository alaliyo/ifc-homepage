import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

interface WrapperProps {
    showMenu: boolean;
}

interface HeaderWrapperProps {
    label: string;
    to: string;
}

function HeaderWrapper({ label, to, children }: React.PropsWithChildren<HeaderWrapperProps>) {
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
            <LinkStyled to={to}>{label}</LinkStyled>
            {/* LinkWrapperWithState 컴포넌트 내부에 들어갈 자식 요소입니다. */}
            <StyledUl showMenu={showMenu}>{children}</StyledUl>
        </LinkWrapper>
    );
}

export default HeaderWrapper;

const LinkWrapper = styled.div<WrapperProps>`
  position: relative;
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
  background-color: #000000a0;
  padding: 0;
  margin: 0;
  list-style: none;
  animation: ${slideDown} 0.3s ease-in-out;
  display: ${(props) => (props.showMenu ? "block" : "none")};
`;

const LinkStyled = styled(Link)`
    padding: 12px 22px;
    color: #cecece;
    font-size: 20px;
    font-weight: 900;
    text-decoration: none;
    border-right: 2px solid #575757;
    display: block;
    &:hover {
        background-color: #777777;
        color: white;
        transition: .3s;
    }
`