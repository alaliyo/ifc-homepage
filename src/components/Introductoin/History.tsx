import styled from 'styled-components';
import { Title } from './IntroStyled';
import { Body } from '../Common/CommonStyled';
import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { authService, dbService } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { HistoryData } from '../../utils/dbService';

function History() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [histroyDate, setHistroyDate] = useState<string>("");
  const [histroyContent, setHistroyContent] = useState("");
  const historyData = HistoryData();
  const [decadIndex, setDecadIndex] = useState(0);
  console.log(historyData);

  // 로그인 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }
    })
  }, []);

  const decadIndexChange = (index: number) => {
    setDecadIndex(index)
  }

  // data 입력
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

  // 게시물 post 
  const historyPost = async (e: any) => {
    e.preventDefault();

    if (histroyDate.length === 0) {
      return alert("날짜를 입력해 주세요.");
    } else if (histroyContent.length === 0) {
      return alert("내용을 입력해 주세요.");
    }

    try {
      const decad = Math.floor(new Date(histroyDate).getFullYear() / 10) * 10;

      // 해당 연도의 데이터 가져오기
      const yearDocRef = doc(dbService, 'history', `${decad}`);
      const yearDocSnap = await getDoc(yearDocRef);

      if (yearDocSnap.exists()) {
        // 데이터가 이미 존재하는 경우 배열에 내용 추가
        const yearData = yearDocSnap.data();
        yearData.contentsArr.push({
          date: histroyDate,
          content: histroyContent,
        });

        // 기존 데이터 업데이트
        await updateDoc(yearDocRef, {
          contentsArr: yearData.contentsArr,
        });
      } else {
        // 데이터가 없는 경우 새로운 데이터 생성
        await setDoc(yearDocRef, {
          date: decad,
          contentsArr: [
            {
              date: histroyDate,
              content: histroyContent,
            }
          ]
        });
      }

      alert("연혁 작성이 완료 되었습니다.");
      setHistroyDate("");
      setHistroyContent("");

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
              <input
                type="text"
                name="date"
                onChange={contentText}
                value={histroyDate}
                placeholder="예) 2023-01-01"
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
          {historyData && historyData.map((obj, i) => (
            <Nav.Item key={obj.date}>
              <NavLink onClick={() => decadIndexChange(i)}>{obj.date}`s</NavLink>
            </Nav.Item>
          ))}
        </Nav>
        <DecadBox>
          <h2>{historyData && historyData[decadIndex].date}`s</h2>
          <Line></Line>
        </DecadBox>
        <div>
          {historyData && historyData[decadIndex].contentsArr
            .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
            .map((obj, i) => (
              <HistoryBox key={i}>
                <HistoryDate>{obj.date.replaceAll("-", ".")}</HistoryDate>
                <HistoryContent>{obj.content}</HistoryContent>
              </HistoryBox>              
            ))
          }
        </div>
      </Body>
    );
}

export default History;

const NavLink = styled(Nav.Link)`
  color: black;
`;

const DecadBox = styled.div`
  padding: 5px;
  margin: 30px 0 0 0;
  display: flex;
  align-items: center;

  h2 {
    color: #7c7c7c;
    margin: 0 10px 0 0;
  }
`;

const Line = styled.div`
  background-color: #7c7c7c;
  width: 100%;
  height: 2px;
`;

const HistoryBox = styled.div`
  font-size: 19px;
  margin: 30px 10px;
  border-bottom: 1px solid #b9b9b9;
`;

const HistoryDate = styled.p`
  color: #8ba3f3;
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 21px;
  }

  @media screen and (max-width: 480px) {
    font-size: 19px;
  }
`;

const HistoryContent = styled.p`
  font-size: 18px;
  padding: 0 10px;
  word-break: keep-all;

  @media screen and (max-width: 768px) {
    font-size: 17px;
  }

  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;