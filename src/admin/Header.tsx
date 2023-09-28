import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { authService } from "../firebase";

function Header() {
    const location = useLocation().pathname.split("/")[2];
    const navigate = useNavigate(); 

    // 로그아웃
    const onLogOutClick = () => {
        authService.signOut();
        alert("로그아웃 되었습니다.");
        navigate("/admin");
    }

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
                    <HomepageTitle>
                        <a href="/">홈페이지</a>
                    </HomepageTitle>
                    <LinkBox>
                        <Link to="/admin/home">홈</Link>
                        <Link to="/admin/bulletin-board/history">게시판 관리</Link>
                        <Link to="/admin/user/certification">회원관리</Link>
                        <Link to="/admin/maintain">유지보수</Link>
                        <Link to="/admin/manual">메뉴얼</Link>
                    </LinkBox>
                    <LogOutBtn onClick={onLogOutClick}>out</LogOutBtn>
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    a {
        font-size: 20px;
        font-weight: 900;
        text-decoration: none;
    }
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
    }

    a {
        color: #838383;
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
    text-align: center;
`;

const MenuBox = styled.div`
    background-color: #555555;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        color: white;
    }
`;

const LinkBox = styled.div`
    display: flex;

    a {
        font-weight: 400;
        margin-left: 20px;
        display: block;

        &:hover {
            transition: 0.2s ease-in-out;
            transform: scale(1.07);
        }
    }
`;

const LogOutBtn = styled.div`
    color: white;
    font-size: 20px;
    margin-right: 15px;
    cursor:pointer;
`;