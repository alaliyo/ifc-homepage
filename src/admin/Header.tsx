import styled from "styled-components";

function Header() {
    return(
        <HeaderBox>
            <LogInBox>
                <InChTitle>
                    <a href="https://set-up-church-website.firebaseapp.com">InCh</a>
                </InChTitle>
            </LogInBox>
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
`;

const InChTitle = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    a {
        color: #8ba3f3;
        font-size: 25px;
        font-weight: 900;
        text-decoration: none;
    }
`;