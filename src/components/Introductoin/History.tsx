import styled from 'styled-components';
import { Title } from './IntroStyled';
import { Body } from '../Common/CommonStyled';
import { Nav } from 'react-bootstrap';
import { useState } from 'react';
import { HistoryData } from '../../utils/dbService';

function History() {
  const historyData = HistoryData();
  const [decadIndex, setDecadIndex] = useState(0);

  const decadIndexChange = (index: number) => {
    setDecadIndex(index)
  }

  return(
      <Body>
        <Title>교회 연혁</Title>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          {historyData && historyData.map((obj, i) => (
            <Nav.Item key={obj.date}>
              <NavLink onClick={() => decadIndexChange(i)}>{obj.date}s</NavLink>
            </Nav.Item>
          ))}
        </Nav>
        <DecadBox>
          <h2>{historyData && historyData[decadIndex].date}s</h2>
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