import { useState } from "react";
import styled from "styled-components";
import { ListGroup, Nav, NavLink } from "react-bootstrap";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { HistoryData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { dbService } from "../../../firebase";


function AdminHistory() {
    const historyData = HistoryData();
    const [histroyDate, setHistroyDate] = useState<string>("");
    const [histroyContent, setHistroyContent] = useState("");
    const [decadIndex, setDecadIndex] = useState(0);
    
    const decadIndexChange = (index: number) => {
        setDecadIndex(index)
    };

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
        <div>
            <ChildTitle>연혁</ChildTitle>

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

            <NavStyled fill variant="tabs" >
                {historyData && historyData.map((obj, i) => (
                    <Nav.Item key={obj.date}>
                    <NavLink onClick={() => decadIndexChange(i)}>{obj.date}`s</NavLink>
                    </Nav.Item>
                ))}
            </NavStyled>

            <ListGroupStyled>
                {historyData && historyData[decadIndex].contentsArr
                    .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
                    .map((obj, i) => (
                        <ListGroup.Item key={i}>{obj.date} {obj.content}</ListGroup.Item>
                    ))
                } 
            </ListGroupStyled>
        </div>
    )
}

export default AdminHistory;

const NavStyled = styled(Nav)`
    width: 80%;
    margin: 0 auto;
`;

const ListGroupStyled = styled(ListGroup)`
    width: 80%;
    margin: 0 auto;
`;