import styled from 'styled-components';
import { Title } from './IntroStyled';
import { Body } from '../Common/CommonStyled';
import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { authService, dbService } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

function History() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [histroyDate, setHistroyDate] = useState(0);
  const [histroyContent, setHistroyContent] = useState("");
  const nowDate = Date.now();
  console.log(Number(new Date("1980-01-01"))-Number(new Date("1960-01-01")));
  // 631152000000
  const contentText = (e: any) => {
    const {
      target: { name, value}
    } = e;

    if (name === "date") {
      setHistroyDate(value);
    } else if (name === "content") {
      setHistroyContent(value);
    }
  };

  // 로그인 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }
    })
  }, []);

  // 게시물 post 
  const historyPost = async (e: any) => {
    e.preventDefault();

    try {
      await setDoc(doc(dbService, 'schedules', `${nowDate}`), {
        id: nowDate,
        
      });
    } catch (error) {
      return alert(error);
    }
  };

  return(
      <Body>
        <Title>교회 연혁</Title>
        <hr />
        {loggedIn && (
          <div>
            <form onSubmit={historyPost}>
              <span>날짜 : </span>
              <input 
                type="date"
                name="date"
                value={histroyDate}
                onChange={contentText}
              />
              <br />
              <span>내용 : </span>
              <input 
                type="text"
                name="content"
                value={histroyContent}
                onChange={contentText}
              />
              <button type='submit'>완료</button>
            </form>
          </div>
        )}
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <NavLink>Active</NavLink>
          </Nav.Item>
        </Nav>
        <TextBox>
          <LeftTextBox>
            <LeftText>
              1.교회 설립 <br /> 2010.02.21 
            </LeftText>
            <LeftText>
              3. 담임 목사 안수 <br /> 2014.04.18
            </LeftText>
            <LeftText>
              5. 타이타이 열방교회 설립 <br/> (필리핀) <br /> 2014.04.18
            </LeftText>
            <LeftText>
              7. 패밀리 캠프 <br /> 2015.08
            </LeftText>
            <LeftText>
              9. 타이타이 열방교회 설립 <br /> 2017.10
            </LeftText>
          </LeftTextBox>
          <div>
            <ArrowLine />
            <ArrowBottom />
          </div>
          <RightTextBox>
            <RightText>
              2. 교회 이전 <br /> 2011.11.30
            </RightText>
            <RightText>
              4. 새 예배당 건축 <br /> 2014.07
            </RightText>
            <RightText>
              6. 제1차 필리핀 선교 <br /> 2015.03.22
            </RightText>
            <RightText>
              8. 스리랑카 선교 시작 <br /> 2017.06.04
            </RightText>
            <RightText>
              10. 열방교회 2번째 건축 <br /> 2022.11
            </RightText>
          </RightTextBox>
        </TextBox>
      </Body>
    );
}

export default History;

const NavLink = styled(Nav.Link)`
  color: black;
`;

const TextBox = styled.div`
  display: grid;
  grid-template-columns: 48% 30px 48%;
`;

const LeftTextBox = styled.div`
  padding-top: 50px;
`;

const LeftText = styled.p`
  font-size: 18px;
  font-weight: 900;
  text-align: right;
  margin-bottom: 150px;
  border-bottom: 2px solid gray;
  word-break: keep-all;
  @media screen and (max-width: 410px) {
    font-size: 15px;
  }
  @media screen and (max-width: 350px) {
    font-size: 13px;
  }
`;

const ArrowLine = styled.div`
  margin: 0px auto;
  height: 1300px;
  width: 5px;
  background-color: #727272;
`

const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  margin: 0px auto;
  border-top: 20px solid #727272;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
`;

const RightTextBox = styled.div`
  padding-top: 150px;
`;

const RightText = styled.p`
  font-size: 18px;
  font-weight: 900;
  text-align: left;
  margin-bottom: 150px;
  border-bottom: 2px solid gray;
  word-break: keep-all;
  @media screen and (max-width: 410px) {
    font-size: 15px;
  }
  @media screen and (max-width: 350px) {
    font-size: 13px;
  }
`;