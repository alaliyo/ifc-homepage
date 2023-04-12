import styled from "styled-components";
import { Link } from 'react-router-dom';

function Navigator() {
    return(
        <NavBox>
            <Title>유튜브</Title>
            <Link to={'posts'}>
                2023
            </Link>
        </NavBox>
    );
};

export default Navigator;

const NavBox = styled.nav`
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
            font-size: 13px;
        }
        :hover {
            color: #ffffff;
            background-color: #7c7c7c;
            transition: .3s;
        }
    }
`;

const Title = styled.h5`
    font-weight: 900;
    margin-bottom: 20px;
    @media screen and (max-width: 650px) {
        font-size: 13px;
    }
`;