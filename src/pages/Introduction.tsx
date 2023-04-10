import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import CrossFades from "../components/DetailPage/CrossFades";
import Navigator from '../components/Introductoin/Navigator';

function Introduction() {
    return(
        <>
            <CrossFades />
            <IntroductionBox>
                <Navigator />
                <OutletBox>
                    <Outlet />
                </OutletBox>
            </IntroductionBox>
            
        </>
    );
}

export default Introduction;

const IntroductionBox = styled.div`
    width: 1020px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1020px) {
        margin: 0 0;
        width: 100%;
    }
`;

const OutletBox = styled.div`
    width: 80%;
`;