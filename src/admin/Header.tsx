import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"

function Header() {
    const location = useLocation().pathname.split("/")[2];

    return(
        <HeaderBox>
            {location === undefined ? (
                <LogInBox>
                    <InChTitle>
                        <a href="https://set-up-church-website.firebaseapp.com">InCh</a>
                    </InChTitle>
                    <HomepageTitle>
                        <a href="/">홈페이지</a>
                    </HomepageTitle>
                </LogInBox>
            ) : (
                <MenuBox>
                    <Link></Link>
                </MenuBox>
            )}
        </HeaderBox>
    )
}

export default Header;

const HeaderBox = styled.header`
    height: 60px;
    width: 100%;
    background-color: white;
    border-bottom: 2px solid #c7c7c7;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`;

const LogInBox = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        a {
            color: #838383;
            font-weight: 900;
            text-decoration: none;
        }
    }
`;

const InChTitle = styled.div`
    width: 120px;

    a {
        font-size: 25px;
    }
`;

const HomepageTitle = styled.div`
    width: 130px;

    a {
        font-size: 20px;
    }
`;

const MenuBox = styled.div`
    display: flex;
    justify-content: center;
`;