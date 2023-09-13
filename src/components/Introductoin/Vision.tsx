import styled from "styled-components";
import { fadeInAnimation } from "../Common/CommonStyled";

function Vision(){
    return(
        <VisionBox>
            <Title>교회 비전</Title>
            <hr />
            <TextBox>
                영구목표: 하나님이 기뻐하시는 교회
            </TextBox>
            <TextBox>
                실천사항: 오직 예수! 오직 성경! 오직 사랑!
            </TextBox>
            <TextBox>
                <div>2023표어:</div>                
                <div>그리스도의 말씀이 너희 속에 풍성히 거하게 하라</div>
            </TextBox>
            <br />
            <br />
            <h5>목회방향</h5>
            <MinistryDirectionList>
                <li>
                    전통적 개혁주의에 입각하여 웨스트민스터 신앙 고백과 대·소요리 문답을 우리의 신조로 하여
                    신앙생활을 확립하고 하나님께 영광을 돌리는 것을 교회의 사명으로 한다.
                </li>
                <li>
                    사람의 귀를 즐겁게 하는 말씀, 사람의 비위를 맞추는 프로그램 및 그러한 교제를 지양하고,
                    오직 하나님의 영광을 위하고, 하나님을 즐겁게 하는 참된 예배와
                    예배의 삶을 지향하는 사역을 위해 목숨을 바친다.
                </li>
                <li>
                    성도들이 듣고 싶어 하는 것은 복음이지, 세상의 멋진 강좌가 아니다.
                    그러므로 언제든지 예수 그리스도가 중심에 있는 복음적 메시지를 전함으로
                    성도들이 예수 그리스도의 장성한 분량으로 자라게 한다.
                </li>
                <li>
                    예수님을 알지 못하는 자들에게 예수 그리스도를 전파하며, 날마다 예수 그리스도와
                    동행하는 삶을 통하여 궁극적으로 불신자들을 주님의 나라로 인도하는 것과
                    상심한 성도들을 회복시키는 것을 최대목표로 삼는다.
                </li>
            </MinistryDirectionList>
        </VisionBox>
    );
}

export default Vision;

const VisionBox = styled.div`
    width: 100%;
    margin-top: 20px;
    animation: ${fadeInAnimation} 0.3s ease-in;
    
    h5 {
        font-weight: 900;
        border-bottom: 2px ridge gray;
        width: 80px;
        @media screen and (max-width: 650px) {
            font-size: 17px;
            width: 70px;
        }
    }
    @media screen and (max-width: 650px) {
        margin-top: 10px;
    }
`;

const Title = styled.h3`
    font-weight: 900;
    text-align: center;
    margin-bottom: 20px;
    @media screen and (max-width: 650px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
`;

const TextBox = styled.div`
    font-weight: 900;
    margin-bottom: 10px;
    font-size: 17.5px;
    display: flex;
    div {
        &:first-child {
            flex-basis: 90px;
            @media screen and (max-width: 650px) {
                flex-basis: 75px;
            }
            @media screen and (max-width: 400px) {
                flex-basis: 90px;
            }
            @media screen and (max-width: 350px) {
                flex-basis: 100px;
            }
        }
    }
    @media screen and (max-width: 650px) {
        font-size: 15px;
    }
`;

const MinistryDirectionList = styled.ol`
    padding-right: 20px;
    li {
        margin-top: 15px;
        @media screen and (max-width: 650px) {
            font-size: 13px;
            margin-top: 13px;
        }
    }
`;