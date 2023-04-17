import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import CrossFades from "../components/generally/CrossFades";
import NavIntroductoin from '../components/Introductoin/NavIntroductoin';
import { PageBody } from './PageStyled';

function Introduction() {
    return(
        <PageBody>
            <CrossFades />
            <IntroductionBox>
                <NavIntroductoin />
                    <OutletBox> 
                        <Outlet/>
                    </OutletBox>
            </IntroductionBox>
        </PageBody>
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
    @media screen and (max-width: 650px) {
        display: grid;
    }
`;

const OutletBox = styled.div`
    width: 80%;
    padding: 20px;
    @media screen and (max-width: 650px) {
        width: 100%;
        padding: 5px;
    }
`;