import styled from "styled-components";
import { Link } from 'react-router-dom';
import Offcanva from "./Offcanva";
import Logo from '../imgs/IFC-Logo.png';
import { authService } from '../firebase';

interface HeaderProps {
    WindowSize: number;
    loggedIn: boolean;
}

interface HomeTitleProps {
    isActive: boolean;
  }

function Header({ WindowSize, loggedIn }: HeaderProps ) {
    const onLogOutClick = () => {
        authService.signOut();
        alert("로그아웃 되었습니다.")
        window.location.href="/"
    }
    
    return(
        <HeaderBox>
            <LinkBoxs>
                <HomeTitle isActive={WindowSize > 650}>
                    <Link to={'/'}>
                        <div>
                            <img src={Logo} alt='' />
                            <span>대한예수교장로회</span> 
                        </div>
                        열 방 교 회
                    </Link>
                </HomeTitle>
                <LinkBox>
                    {WindowSize <= 650 ? (
                        <Offcanva loggedIn={loggedIn} />
                    ) : (
                        loggedIn ? (
                            <Link to={'/'} onClick={onLogOutClick}>
                                logout
                            </Link>
                        ) : (
                            <Link to={'/login'}>
                                login
                            </Link>
                        )
                    )}
                </LinkBox>
            </LinkBoxs>
            {WindowSize > 650 && (
                <NavBox>
                    <Link to={'/introduction/vision'} >
                        {WindowSize <= 825 ? '소개' : '교회소개' }
                    </Link>
                    <Link to={'/schedule'}>
                        {WindowSize <= 825 ? '일정' : '교회일정' }
                    </Link>
                    <Link to={'/youtube/posts'}>
                        {WindowSize <= 825 ? '유튜브' : '교회 유튜브' }
                    </Link>
                    <Link to={'/ministry'}>
                        {WindowSize <= 825 ? '사역' : '교회학교 및 훈련사역' }
                    </Link>
                    <Link to={'/mission'}>
                        {WindowSize <= 825 ? '선교' : '전도 및 선교' }
                    </Link>
                </NavBox>
            )}
        </HeaderBox>
    );
}

export default Header;

const HeaderBox = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 130px;
    width: 100%;
    padding: 0 10px;
    @media screen and (max-width: 1020px) {
        width: 100%;
        padding: 0px;
    }
`;

const LinkBoxs = styled.div`
    height: 75px;
    width: 1020px;
    padding-left: 25px;
    padding-right: 25px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1140px) {
        width: 88%;
        padding-left: 0;
        padding-right: 0;
    }
`;

const HomeTitle = styled.div<HomeTitleProps>`
    display: flex;
    align-items: center;
    margin-top: -10px;
    a {
        color: #ffffff;
        font-weight: 900;
        text-shadow: 1px 1px 4px #808080, -1px -1px 4px #808080;
        font-size: ${p => p.isActive ? '25px' : '20px'};
        text-decoration: none;
        img {
            width: 20px;
            height: 20px;
        }
        span {
            font-size: 12px;
            @media screen and (max-width: 650px) {
                font-size: 10px;
            }
        }
    }
`;

const LinkBox = styled.div`
    display: flex;
    align-items: center;
    a {
        font-size: 16px;
        color: #ffffff;
        text-shadow: 1px 1px 4px #808080, -1px -1px 4px #808080;
        display: block;
        text-decoration: none;
    }
`;

const NavBox = styled.nav`
    height: 55px;
    background-color: #000000a0;
    box-shadow: 1px 1px 2px #808080, -1px -1px 2px #808080;
    display: flex;
    width: max-content;
    margin: 0 auto;
    a {
        padding: 10px 22px;
        color: #cecece;
        font-size: 20px;
        font-weight: 900;
        text-decoration: none;
        border-right: 2px solid #575757;
        &:hover {
            background-color: #777777c5;
            color: white;
            transition: .3s;
        }
    }
`;