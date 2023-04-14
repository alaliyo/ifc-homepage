import { useState  } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import { authService } from '../firebase';

interface OffcanvaProps {
    loggedIn: boolean;
}

function Offcanva({ loggedIn }: OffcanvaProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClick = () => {
        setShow(false)
    }

    const onLogOutClick = () => {
        authService.signOut();
        alert("로그아웃 되었습니다.")
        window.location.href="/"
    }

    return(
        <>
        <OffcanvaBtn onClick={handleShow}>
            메뉴
        </OffcanvaBtn>
  
        <OffcanvaBox show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <LinkStyle to={'/'} onClick={onClick}>
                    열방교회
                </LinkStyle>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <LinkStyle to={'/introduction/vision'} onClick={onClick}>
                    교회소개
                </LinkStyle>
                <LinkStyle to={'/schedule'} onClick={onClick}>
                    교회일정
                </LinkStyle>
                <LinkStyle to={'/youtube/posts'} onClick={onClick}>
                    교회 유튜브
                </LinkStyle>
                <LinkStyle to={'/ministry'} onClick={onClick}>
                    교회 사역
                </LinkStyle>
                <LinkStyle to={'/mission'} onClick={onClick}>
                    전도 및 선교
                </LinkStyle>
                {loggedIn ? (
                    <LinkStyle to={'/'} onClick={onLogOutClick}>
                        로그아웃
                    </LinkStyle>
                ) : (
                    <LinkStyle to={'/login'} onClick={onClick}>
                        관리자 로그인
                    </LinkStyle>
                )}

            </Offcanvas.Body>
        </OffcanvaBox>
      </>
    );
}

export default Offcanva;

const OffcanvaBtn = styled(Button)`
    --bs-btn-bg: none;
    --bs-btn-border-color: none;
    --bs-btn-hover-bg: none;
    text-shadow: 1px 1px 4px #757575, -1px -1px 4px #757575;
    font-weight: 900;
    &:hover{
        text-shadow: 1px 1px 3px #3d3d3d, -1px -1px 3px #3d3d3d;
    }
`;

const OffcanvaBox = styled(Offcanvas)`
    --bs-offcanvas-width: 50%;
    --bs-offcanvas-bg: #131313d6;

`;

const LinkStyle = styled(Link)`
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
    display: block;
    text-decoration: none;
    :hover {
        color: white;
        font-weight: 900;
    }
    @media screen and (max-width: 400px) {
        font-size: 13px;
    }
`