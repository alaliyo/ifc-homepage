import styled from "styled-components";

function Footer() {
    return(
        <FooterBox>
            <div>
                <Text>교회명: 열방교회</Text>
                <Text>담임목사: 홍경희 목사</Text>
                <Text>전화번호: 055-386-1080</Text>
            </div>

            <div>
                <Text>이메일: fellowshipic2010@gmail.com</Text>
                <Text>주소: 경남 양산시 삼호동부6길 18</Text>
                <Text as="a" href="https://band.us/band/48150076" target="_blank">밴드 링크</Text>
            </div>
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
    grid-template-columns: 4fr 5fr;

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

const Text = styled.p`
    color: white;
    font-weight: 900;
    margin-bottom: 5px;
    text-decoration: none;

    :hover {
        color: white;
        text-decoration: underline;
    }

    @media screen and (max-width: 650px) {
        font-size: 15px;
        margin-bottom: 3px;
    }

    @media screen and (max-width: 560px) {
        font-size: 12px;
        margin-bottom: 2px;
    }

    @media screen and (max-width: 440px) {
        font-size: 10px;
    }
`