import styled from "styled-components";
import { Link } from 'react-router-dom';

function Navigator() {
    return(
        <NavBox>
            <Title>교회소개</Title>
            <Link to={'vision'}>
                교회 <br /> 비전
            </Link>
            <Link to={'history'}>
                교회 <br /> 연혁
            </Link>
            <Link to={'pastor'}>
                담임 <br /> 목사
            </Link>
            <Link to={'pastors'}>
                교역자
            </Link>
            <Link to={'elder'}>
                장로
            </Link>
            <Link to={'sketch-map'}>
                교회 <br /> 약도
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