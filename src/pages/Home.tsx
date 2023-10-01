import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import CrossFade from './../components/Home/CrossFade';
import { PageBody } from './PageStyled';
import { Link, useNavigate } from 'react-router-dom';
import useHandleResize from '../hooks/useHandleResize';
import CrossImg from '../imgs/CrossImg.png';
import Img1 from '../imgs/HomeImg01.png';
import Img2 from '../imgs/HomeImg02.png';
import Img3 from '../imgs/HomeImg03.png';
import Img4 from '../imgs/HomeImg04.png';
import Img5 from '../imgs/HomeImg05.png';

function Home() {
    const Resize = useHandleResize();
    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate('/youtube/youtube-kr')
    }

    return(
        <PageBody>
            <CrossFade />
            <HomeBody>
                <ShortcutsBox>
                    {Resize > 450 ? (<>
                        <Sermon Resize={Resize} onClick={onClickNavigate}>
                            <Sermontitle>담임 목사 <br />&emsp;오전 설교</Sermontitle>
                            <BadgeStyled bg="success"><Link to='/youtube/youtube-kr'>바로 가기</Link></BadgeStyled>
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
                                <Link to="/event-story/post">
                                    <span>행사 페이지가 <br /> 업데이트 <br /> 되었습니다.</span>
                                </Link>
                            </Construction>
                    </>) : (<>
                        <ChilderBox>
                            <Sermon Resize={Resize} onClick={onClickNavigate}>
                                <Sermontitle>담임 목사님의 <br />&emsp;오전 설교</Sermontitle>
                                <BadgeStyled bg="success"><Link to='/youtube/kr-posts'>바로 가기</Link></BadgeStyled>
                            </Sermon>
                                <Construction>
                                    <Link to="/event-story/post">
                                        <span>행사 페이지가 <br /> 업데이트 되었습니다.</span>
                                    </Link>
                                </Construction>
                        </ChilderBox>
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
                    </>)}
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
        grid-template-rows: 1fr;
    }

    @media screen and (max-width: 450px) {
        height: 100%;
        display: block;
    }
`;

interface Resize {
    Resize: number;
}

const Sermon = styled.div<Resize>`
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url(${CrossImg});
    background-size: 100% 100%;

    @media screen and (max-width: 650px) {
        padding: 10px;
    }

    @media screen and (max-width: 450px) {
        width: 96%;
        height: 120px;
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

    @media screen and (max-width: 450px) {
        font-size: 17px;
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
    }
`;

const IntroBox = styled.div`
    padding: 2%;
    display: grid;
    grid-template-columns: repeat(2, 49%);
    grid-template-rows: repeat(2, 49%);
    gap: 2%;
    
    @media screen and (max-width: 450px) {
        grid-template-columns: repeat(4, 23.5%);
        grid-template-rows: none;
    }

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

            @media screen and (max-width: 450px) {
                font-size: 15px;
            }
        }

        @media screen and (max-width: 450px) {
            border-radius: 10px;
            height: 20vw;
        }
    }
`;

const Construction = styled.div`
    background-image: url(${Img5});
    background-size: 100% 100%;
    border-radius: 10px;
    padding-top: 20px;
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    text-shadow: 1px 1px 4px #000000, -1px -1px 4px #000000;

    a {
        color: white;
        text-decoration: none;
    }

    @media screen and (max-width: 820px) {
        font-size: 15px;
    }

    @media screen and (max-width: 650px) {
        padding-top: 10px;
        font-size: 13px;
    }

    @media screen and (max-width: 450px) {
        width: 96%;
        height: 120px;
        font-size: 15px;
        padding-top: 7px;
        flex-direction: row;
    }
`;

const ChilderBox = styled.div`
    width: 96%;
    margin: 0 auto 7px auto;
    display: flex;
    justify-content: space-between;
    
    div {
        width: 49%;
    }
`;