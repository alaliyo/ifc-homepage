import styled from "styled-components";

function Footer() {
    return(
        <FooterBox>
            <FooterTextBox>
                <p>교회명 : 열방교회</p>
                <p>담임목사 : 홍경희 목사</p>
                <p>전화번호 : 055-386-1080</p>
            </FooterTextBox>
            <FooterTextBox>
                <p>이메일 : fellowshipic2010@gmail.com</p>
                <p>주소 : 경남 양산시 삼호동부6길 18</p>
                <p>제작자 : 김성원</p>
            </FooterTextBox>
        </FooterBox>
    );
}

export default Footer;

const FooterBox = styled.footer`
    width: 100%;
    height: 130px;
    background-color: #8a8a8a;
    padding: 20px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    @media screen and (max-width: 650px) {
        height: 110px;
        padding: 15px;
    }
    @media screen and (max-width: 500px) {
        height: 80px;
        padding: 10px;
    }
    @media screen and (max-width: 400px) {
        height: 80px;
        padding: 10px 5px;
    }
    @media screen and (max-width: 400px) {
        height: 70px;
    }
`;

const FooterTextBox = styled.div`
    p {
        color: white;
        font-weight: 900;
        margin-bottom: 5px;
        @media screen and (max-width: 650px) {
            font-size: 15px;
            margin-bottom: 3px;
        }
        @media screen and (max-width: 500px) {
            font-size: 12px;
            margin-bottom: 2px;
        }
        @media screen and (max-width: 400px) {
            font-size: 11px;
        }
        @media screen and (max-width: 350px) {
            font-size: 10px;
        }
    }
`;