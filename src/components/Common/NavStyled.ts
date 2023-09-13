import styled from "styled-components";

export const NavBox = styled.nav`
    height: 500px;
    width: 20%;
    padding-top: 20px;
    text-align: center;

    @media screen and (max-width: 650px) {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 0;
        border-bottom: 1px solid #7c7c7c;
    }

    a {
        padding: 10px;
        color: #525252;
        font-size: 17px;
        display: block;
        text-decoration: none;
        font-weight: 900;
        flex: 1;

        @media screen and (max-width: 650px) {
            font-size: 13px;
            padding: 4.5px 1px;
            border-right: 1px solid gray;
        }

        @media screen and (max-width: 350px) {
            font-size: 12px;
            padding: 6px 1px;
        }

        :hover {
            color: #ffffff;
            background-color: #7c7c7c;
            transition: .3s;
        }
    }
`;

export const Title = styled.h5`
    font-weight: 900;
    margin-bottom: 20px;
    @media screen and (max-width: 650px) {
        font-size: 13px;
    }
`;