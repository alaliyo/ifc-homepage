import styled from "styled-components";
import { Link } from 'react-router-dom';
import Offcanva from "./Offcanva";
import Logo from '../../imgs/IFC-Logo.png';
import { authService } from '../../firebase';
import HeaderWrapper from "./HeaderWrapper";

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
                                aminout
                            </Link>
                        ) : (
                            <Link to={'/login'}>
                                aminIn
                            </Link>
                        )
                    )}
                </LinkBox>
            </LinkBoxs>
            {WindowSize > 650 && (
                <NavBox>
                    <HeaderWrapper
                        label={WindowSize <= 825 ? '소개' : '교회소개'}
                        to='/introduction/vision'
                    >
                        <li><LinkStyled to='/introduction/vision'>비전</LinkStyled></li>
                        <li><LinkStyled to='/introduction/history'>연혁</LinkStyled></li>
                        <li><LinkStyled to='/introduction/rev'>담임목사</LinkStyled></li>
                        <li><LinkStyled to='/introduction/pastors'>교역자</LinkStyled></li>
                        <li><LinkStyled to='/introduction/elder'>장로</LinkStyled></li>
                        <li><LinkStyled to='/introduction/sketch-map'>약도</LinkStyled></li>
                    </HeaderWrapper>

                    <HeaderWrapper
                        label={WindowSize <= 825 ? '일정' : '교회일정'}
                        to='/schedule/worship-time'
                    >
                        <li><LinkStyled to='/schedule/worship-time'>예배시간</LinkStyled></li>
                        <li><LinkStyled to='/schedule/year'>연중계획</LinkStyled></li>
                    </HeaderWrapper>

                    <HeaderWrapper 
                        label={WindowSize <= 825 ? '유튜브' : '교회 유튜브'}
                        to='/youtube/kr-posts'
                    >
                        <li><LinkStyled to='/youtube/kr-posts'>한국</LinkStyled></li>
                        <li><LinkStyled to='/youtube/en-posts'>영어</LinkStyled></li>
                    </HeaderWrapper>
                    
                    <HeaderWrapper 
                        label='행사'
                        to='/event-story/post'
                    >
                    </HeaderWrapper>

                    {/* <HeaderWrapper 
                        label={WindowSize <= 825 ? '사역' : '교회학교 및 훈련사역'}
                        to='/ministry'
                    >
                    </HeaderWrapper> */}

                    <HeaderWrapper 
                        label={WindowSize <= 825 ? '선교' : '선교 및 전도'}
                        to='/mission/overseas'
                    >
                    </HeaderWrapper> 

                    
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
        font-size: 11px;
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
`;

const LinkStyled = styled(Link)`
    display: block;
    padding: 5px 0;
    text-align: center;
    font-weight: 900;
    color: #cecece;
    text-decoration: none;
    &:hover {
        background-color: #777777;
        color: white;
        transition: .3s;
    }
`;