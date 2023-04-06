import styled from "styled-components";
import { Link } from 'react-router-dom';

function Header() {
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
                    교회소개
                </Link>
                <Link to={'/schedule'}>
                    교회일정
                </Link>
                <Link to={'/youtube'}>
                    교회 유튜브
                </Link>
                <Link to={'/ministry'}>
                    교회학교 및 훈련사역
                </Link>
                <Link to={'/mission'}>
                    전도 및 선교
                </Link>
            </NavBox>
        </HeaderBox>
    );
}

export default Header;

const HeaderBox = styled.header`
    height: 130px;
    width: 1020px;
    padding: 0 10px;
    margin: 0 auto;
    @media screen and (max-width: 1020px) {
        width: 100%;
        padding: 0px;
    }
`;

const LinkBoxs = styled.div`
    height: 75px;
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    justify-content: space-between;
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
    background-color: #3f3f3fc7;
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