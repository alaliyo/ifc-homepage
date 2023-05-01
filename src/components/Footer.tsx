import styled from "styled-components";

function Footer() {
    return(
        <FooterBox>
            <FooterTextBox>
                <p>교회명: 열방교회</p>
                <p>담임목사: 홍경희 목사</p>
                <p>전화번호: 055-386-1080</p>
                <p>주소: 경남 양산시 삼호동부6길 18</p>
                <p>이메일: fellowshipic2010@gmail.com</p>
            </FooterTextBox>
            <FooterTextBox>
                <p>제작자: 김성원</p>
                <p>버전: v1.2.1</p>
                <p>이미지 저작권: 미리캠퍼스</p>
                <p>폰트 저작권: NAVER</p>
                <p>홈페이지 저작권: 도용을 금합니다.</p>
            </FooterTextBox>
        </FooterBox>
    );
}

export default Footer;

const FooterBox = styled.footer`
    width: 100%;
    height: max-content;
    background-color: #8a8a8a;
    padding: 20px;
    display: grid;
    grid-template-columns: 5fr 4fr;
    @media screen and (max-width: 650px) {
        padding: 15px;
    }
    @media screen and (max-width: 510px) {
        padding: 10px;
    }
    @media screen and (max-width: 410px) {
        padding: 10px 5px;
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
        @media screen and (max-width: 510px) {
            font-size: 12px;
            margin-bottom: 2px;
        }
        @media screen and (max-width: 410px) {
            font-size: 11px;
        }
        @media screen and (max-width: 370px) {
            font-size: 10px;
        }
    }
`;