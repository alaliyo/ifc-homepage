import styled from "styled-components";

export const NavBox = styled.nav`
    height: 500px;
    width: 20%;
    padding-top: 20px;
    text-align: center;
    a {
        padding: 10px;
        color: #525252;
        font-size: 17px;
        display: block;
        text-decoration: none;
        font-weight: 900;
        @media screen and (max-width: 650px) {
            font-size: 12px;
            padding: 5px;
        }
        @media screen and (max-width: 350px) {
            font-size: 11px;
        }
        :hover {
            color: #ffffff;
            background-color: #7c7c7c;
            transition: .3s;
        }
    }
    @media screen and (max-width: 650px) {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 0;
        border-bottom: 1px solid #7c7c7c;
    }
`;

export const Title = styled.h5`
    font-weight: 900;
    margin-bottom: 20px;
    @media screen and (max-width: 650px) {
        font-size: 13px;
    }
`;