import styled from "styled-components";
import { HomeChildBox } from "./HomeChildStyled";

function Intro() {
    return(
        <HomeChildBox>
            <h3>기본 정보</h3>
            <IntroBox>
                <div>
                    <h5>구축정보</h5>
                    서비스시작 : 2023-09-24 <br />
                    신청자 : 김성원집사 <br />
                    구축비용 : 0원 <br />
                    유지보수 : 0원/월
                </div>
                <div>
                    <h5>도매인정보</h5>
                    도매인 : ifcc.or.kr <br />
                    만료일 : 2024-04-22 <br />
                    요금: 21,000원/년
                </div>
            </IntroBox>
        </HomeChildBox>
    );
}

export default Intro;

const IntroBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    h5 {
        width: 200px;
        margin: 0 auto 10px auto;
        border-bottom: 1px solid #c7c8c9;
    }
`