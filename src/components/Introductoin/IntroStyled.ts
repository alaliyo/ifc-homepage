import styled from "styled-components";
import { Card } from 'react-bootstrap';

export const CardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-items: center;
    margin-bottom: 40px;
`;

export const CardFrame = styled.div`
    width: 10.5rem;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #d1d1d1, -1px -1px 4px #d3d3d3;

    @media screen and (max-width: 768px) {
        margin: 20px auto;
    }
`;

export const CardBody = styled(Card.Body)`
    padding: 10px;
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
    
    @media screen and (max-width: 768px) {
        margin-right: auto;
        margin-left: auto;
        font-size: 18px;
        width: 80px;
    }
`;