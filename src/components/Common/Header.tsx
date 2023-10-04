import styled from "styled-components";
import { Link } from 'react-router-dom';
import Offcanva from "./Offcanva";
import Logo from '../../imgs/IFC-Logo.png';
import HeaderWrapper from "./HeaderWrapper";

interface HeaderProps {
    WindowSize: number;
}

interface HomeTitleProps {
    isActive: boolean;
}

function Header({ WindowSize }: HeaderProps ) {
    
    return(
        <HeaderBox>
            <LinkBoxs>
                <HomeTitle isActive={WindowSize > 768}>
                    <Link to={'/'}>
                        <div>
                            <img src={Logo} alt='' />
                            <span>대한예수교장로회</span> 
                        </div>
                        열 방 교 회
                    </Link>
                </HomeTitle>
                <LinkBox>
                    {WindowSize <= 768 && (
                        <Offcanva />
                    )}
                </LinkBox>
            </LinkBoxs>
            {WindowSize > 768 && (
                <NavBox>
                    <HeaderWrapper label='교회소개' to='/introduction/vision'>
                        <li><LinkStyled to='/introduction/vision'>비전</LinkStyled></li>
                        <li><LinkStyled to='/introduction/history'>연혁</LinkStyled></li>
                        <li><LinkStyled to='/introduction/rev'>담임목사</LinkStyled></li>
                        <li><LinkStyled to='/introduction/pastors'>교역자</LinkStyled></li>
                        <li><LinkStyled to='/introduction/elder'>장로</LinkStyled></li>
                        <li><LinkStyled to='/introduction/sketch-map'>약도</LinkStyled></li>
                    </HeaderWrapper>

                    <HeaderWrapper label='교회일정' to='/schedule/worship-time'>
                        <li><LinkStyled to='/schedule/worship-time'>예배시간</LinkStyled></li>
                        <li><LinkStyled to='/schedule/year'>연중계획</LinkStyled></li>
                        <li><LinkStyled to='/schedule/weekly/list'>주보</LinkStyled></li>
                    </HeaderWrapper>

                    <HeaderWrapper label='유튜브' to='/youtube/youtube-kr'>
                        <li><LinkStyled to='/youtube/youtube-kr'>한국</LinkStyled></li>
                        <li><LinkStyled to='/youtube/youtube-en'>영어</LinkStyled></li>
                    </HeaderWrapper>

                    <HeaderWrapper label='기관 및 학교' to='/ministry/senior'>
                        <li><LinkStyled to='/ministry/senior'>실로암</LinkStyled></li>
                        <li><LinkStyled to='/ministry/men'>남선교회</LinkStyled></li>
                        <li><LinkStyled to='/ministry/women'>여선교회</LinkStyled></li>
                        <li><LinkStyled to='/ministry/multicultural'>다문화</LinkStyled></li>
                        <li><LinkStyled to='/ministry/youth'>유스그룹</LinkStyled></li>
                        <li><LinkStyled to='/ministry/children'>주일학교</LinkStyled></li>
                    </HeaderWrapper>
                    
                    <HeaderWrapper label='앨범' to='/event-story/post'></HeaderWrapper>
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

    @media screen and (max-width: 1024px) {
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

    @media screen and (max-width: 1024px) {
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

            @media screen and (max-width: 768px) {
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
    height: 54px;
    background-color: #000000a0;
    box-shadow: 1px 1px 2px #808080, -1px -1px 2px #808080;
    display: flex;
    width: max-content;
    margin: 0 auto;
`;

const LinkStyled = styled(Link)`
    display: block;
    padding: 10px 0;
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