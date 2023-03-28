import styled from "styled-components";
import { Link } from 'react-router-dom';

function Header() {
    return(
        <HeaderBox>
            <LinkBox>
                <Link to={'/'}>IFC<span>(Hobby Pairing)</span></Link>
            </LinkBox>
            <LinkBox></LinkBox>
    </HeaderBox>
    );
}

export default Header;

const HeaderBox = styled.header`
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 10px 15%;
    @media screen and (max-width: 978px) {
        padding-left: 10%;
        padding-right: 10%;  
    }
    @media screen and (max-width: 768px) {
        padding-left: 5%;
        padding-right: 5%;  
    }
    @media screen and (max-width: 600px) {
        padding-left: 10px;
        padding-right: 0;  
    }
`;

const LinkBox = styled.div`
        display: flex;
        align-items: center;
    a {
        font-weight: 900;
        font-size: 20px;
        color: #ad4fd8;
        margin-right: 20px;
        display: block;
        text-decoration: none;
        &:hover {
            color: #e3a8ff;
            text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
            transition: .3s;
        }
        span {
            font-size: 14px;
        }
    }
`;