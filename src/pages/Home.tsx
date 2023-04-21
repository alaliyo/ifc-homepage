import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import CrossFade from './../components/Home/CrossFade';
import { PageBody } from './PageStyled';
import { Link } from 'react-router-dom';
import SermonImg from '../imgs/CrossImg.png';
import Img1 from '../imgs/HomeImg01.png';
import Img2 from '../imgs/HomeImg02.png';
import Img3 from '../imgs/HomeImg03.png';
import Img4 from '../imgs/HomeImg04.png';
import Img5 from '../imgs/HomeImg05.png';

function Home() {
    return(
        <PageBody>
            <CrossFade />
            <HomeBody>
                <ShortcutsBox>
                    <Sermon>
                        <Sermontitle>담임 목사님의 <br />&emsp;오전 설교</Sermontitle>
                        <BadgeStyled bg="success"><Link to='/youtube/posts'>바로 가기</Link></BadgeStyled>
                    </Sermon>
                    <IntroBox>
                        <div>
                            <Link to='/schedule/worship-time'>예배<br />안내</Link>
                        </div>
                        <div>
                            <Link to='/introduction/sketch-map'>교회<br />약도</Link>
                        </div>
                        <div>
                            <Link to='/schedule/year'>연중<br />계획</Link>
                        </div>
                        <div>
                            <Link to='/introduction/vision'>교회<br />비전</Link>
                        </div>
                    </IntroBox>
                    <Construction>
                        <span>선교 및 사역 <br /> 페이지는 <br /> 준비중입니다.</span>
                    </Construction>
                </ShortcutsBox>
            </HomeBody>
        </PageBody>
    );
}

export default Home;

const HomeBody = styled.div`
    width: 1020px;
    height: 306px;
    margin: 0 auto;
    padding: 15px 0;
    @media screen and (max-width: 1020px) {
        width: 100%;
        height: auto;
    }
`;

const ShortcutsBox = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    justify-content: space-evenly;
    @media screen and (max-width: 1020px) {
        height: 27vw;
    }
`;

const Sermon = styled.div`
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url(${SermonImg});
    background-size: 100% 100%;
    @media screen and (max-width: 650px) {
        padding: 10px;
    }
`;

const Sermontitle = styled.span`
    margin-top: 0px;
    display: block;
    font-size: 20px;
    font-weight: 900;
    text-shadow: 1px 1px 4px #000000, -1px -1px 4px #000000;
    color: white;
    @media screen and (max-width: 650px) {
        font-size: 14px;
    }
    @media screen and (max-width: 460px) {
        font-size: 12px;
    }
`;

const BadgeStyled = styled(Badge)`
    float: right;
    align-self: flex-end;
    &:hover {
        background-color: #a1a1a1a1;
    }
    a {
        font-size: 15px;
        color: #dbdbdb;
        text-decoration: none;
        &:hover {
            color: #ffffff;
        }
        @media screen and (max-width: 650px) {
            font-size: 12px;
        }
    }
`;

const IntroBox = styled.div`
    padding: 2%;
    display: grid;
    grid-template-columns: repeat(2, 49%);
    grid-template-rows: repeat(2, 49%);
    gap: 2%;
    div {
        box-shadow: 1px 1px 3px #838383, -1px -1px 3px #838383;
        cursor: pointer;
        
        :nth-child(1) {
            border-top-left-radius: 10px;
            background-image: url(${Img1});
            background-size: 100% 100%;
        }
        :nth-child(2) {
            border-top-right-radius: 10px;
            background-image: url(${Img2});
            background-size: 100% 100%;
        }
        :nth-child(3) {
            border-bottom-left-radius: 10px;
            background-image: url(${Img3});
            background-size: 100% 100%;
        }
        :nth-child(4) {
            border-bottom-right-radius: 10px;
            background-image: url(${Img4});
            background-size: 100% 100%;
        }
        a {
            width: 100%;
            height: 100%;
            display: block;
            display : flex;
            justify-content : center;
            align-items : center;
            font-size: 20px;
            color: #ffffff;
            font-weight: 900;
            text-shadow: 1px 1px 4px #000000, -1px -1px 4px #000000;
            text-decoration: none;
            &:hover {
                color: #e6e6e6;
            }
            @media screen and (max-width: 600px) {
                font-size: 13px;
            }
        }
    }
`;

const Construction = styled.div`
    background-image: url(${Img5});
    background-size: 100% 100%;
    border-radius: 10px;
    padding-top: 20px;
    color: white;
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    text-shadow: 1px 1px 4px #000000, -1px -1px 4px #000000;
    @media screen and (max-width: 820px) {
        font-size: 15px;
    }
    @media screen and (max-width: 650px) {
        padding-top: 10px;
        font-size: 14px;
    }
    @media screen and (max-width: 500px) {
        padding-top: 5px;
        font-size: 11px;
    }
    @media screen and (max-width: 350px) {
        padding-top: 3px;
        font-size: 10px;
    }
`;