import styled from "styled-components";
import { Card } from 'react-bootstrap';

export const Title = styled.h3`
    font-weight: 900;
    text-align: center;
    margin-bottom: 20px;

    @media screen and (max-width: 650px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
`;

export const HrBottom = styled.hr`
    border-top: 3px solid #363636; 
    margin-bottom: 50px;

    @media screen and (max-width: 650px) {
        border-top: 1px solid black; 
    }
`;

export const CardBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 40px;

    @media screen and (max-width: 650px) {
        display: block;
    }
`;

export const CardFrame = styled.div`
    width: 11.5rem;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #d1d1d1, -1px -1px 4px #d3d3d3;

    @media screen and (max-width: 650px) {
        margin: 20px auto;
    }
`;

export const CardText = styled(Card.Text)`
    text-align: center;
    font-weight: 900;
`;

export const SeparationText = styled.p`
    font-size: 20px;
    font-weight: 900;
    border-bottom: 2px solid gray;
    width: 80px;
    margin-bottom: 20px;
    text-align: center;
    
    @media screen and (max-width: 650px) {
        margin-right: auto;
        margin-left: auto;
        font-size: 18px;
        width: 80px;
    }
`;