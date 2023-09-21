import styled from "styled-components";

export const NavBox = styled.nav`
    height: 500px;
    width: 20%;
    padding-top: 20px;
    text-align: center;

    @media screen and (max-width: 768px) {
        text-align: start;
        height: auto;
        width: 100%;
        overflow-x: scroll;
        white-space: nowrap;
        border-bottom: 1px solid gray;
        display: inline-block;
        padding: 0;
    }

    a {
        padding: 15px;
        color: #525252;
        font-size: 17px;
        display: block;
        text-decoration: none;
        font-weight: 900;
        flex: 1;

        :hover {
            color: #ffffff;
            background-color: #7c7c7c;
            transition: .3s;
        }

        @media screen and (max-width: 768px) {
            padding: 10px 20px;
            display: inline-block;
        }

        @media screen and (max-width: 480px) {
            font-size: 15px;
            padding: 8px 15px;
        }
    }
`;

export const Title = styled.h5`
    font-weight: 900;
    margin-bottom: 20px;
`;