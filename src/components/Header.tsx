import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

function Header() {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setwindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    console.log(windowWidth)

    return(
        <HeaderBox>
            <LinkBoxs>
                <HomeTitle>
                    <Link to={'/'}>열방교회</Link>
                </HomeTitle>
                <LinkBox>
                    <Link to={'/login'}>
                        login
                    </Link>
                </LinkBox>
            </LinkBoxs>

            <NavBox>
                <Link to={'/introduction'}>
                    {windowWidth <= 825 ? '소게' : '교회소개' }
                </Link>
                <Link to={'/schedule'}>
                    {windowWidth <= 825 ? '일정' : '교회일정' }
                </Link>
                <Link to={'/youtube'}>
                    {windowWidth <= 825 ? '유튜브' : '교회 유튜브' }
                </Link>
                <Link to={'/ministry'}>
                    {windowWidth <= 825 ? '사역' : '교회학교 및 훈련사역' }
                </Link>
                <Link to={'/mission'}>
                    {windowWidth <= 825 ? '선교' : '전도 및 선교' }
                </Link>
            </NavBox>
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

const HomeTitle = styled.div`
    display: flex;
    align-items: center;
    a {
        color: #ffffff;
        font-weight: 900;
        text-shadow: 1px 1px 4px #808080, -1px -1px 4px #808080;
        font-size: 25px;
        text-decoration: none;
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