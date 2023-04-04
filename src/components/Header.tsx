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

            </NavBox>
        </HeaderBox>
    );
}

export default Header;

const HeaderBox = styled.header`
    height: 100px;
    width: 1020px;
    padding: 0 10px;
    margin: 0 auto;
    @media screen and (max-width: 1020px) {
        height: 100px;
        width: 100%;
        padding: 0px;
    }
`;

const LinkBoxs = styled.div`
    height: 50%;
    padding-left: 15px;
    padding-right: 15px;
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
        &:hover {
            text-decoration: underline;
        }
    }

`;

const NavBox = styled.nav`
    height: 50%;
    background-color: #363636c9;
    box-shadow: 1px 1px 2px #808080, -1px -1px 2px #808080;
`;