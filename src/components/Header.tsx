import styled from "styled-components";
import { Link } from 'react-router-dom';
import Offcanva from "./Offcanva";

export interface WindowSize {
    WindowSize: number
}

interface HomeTitleProps {
    isActive: boolean;
  }

function Header({ WindowSize }: WindowSize) {
    
    return(
        <HeaderBox>
            <LinkBoxs>
                <HomeTitle isActive={WindowSize > 650}>
                    <Link to={'/'}>열방교회</Link>
                </HomeTitle>
                <LinkBox>
                    {WindowSize <= 650 ? (
                        <Offcanva />
                    ) : (
                        <Link to={'/login'}>
                            login
                        </Link>
                    )}

                </LinkBox>
            </LinkBoxs>
            {WindowSize > 650 && (
                <NavBox>
                    <Link to={'/introduction'}>
                        {WindowSize <= 825 ? '소게' : '교회소개' }
                    </Link>
                    <Link to={'/schedule'}>
                        {WindowSize <= 825 ? '일정' : '교회일정' }
                    </Link>
                    <Link to={'/youtube'}>
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
    a {
        color: #ffffff;
        font-weight: 900;
        text-shadow: 1px 1px 4px #808080, -1px -1px 4px #808080;
        font-size: ${p => p.isActive ? '25px' : '20px'};
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