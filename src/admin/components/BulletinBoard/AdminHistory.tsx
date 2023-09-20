import { useState } from "react";
import styled from "styled-components";
import { Button, Form, InputGroup, ListGroup, Nav, NavLink } from "react-bootstrap";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { HistoryData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { dbService } from "../../../firebase";

function AdminHistory() {
    const historyData = HistoryData();
    const [histroyDate, setHistroyDate] = useState<string>("");
    const [histroyContent, setHistroyContent] = useState("");
    const [decadIndex, setDecadIndex] = useState(0);
    const [editingItem, setEditingItem] = useState<{ id: number; date: string; content: string } | null>(null);
    
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
                    id: Date.now(),
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

    // 게시물 DELETE
    const deleteHistory = async (id: number, content: string) => {
        if (window.confirm(`"${content}" 연혁을 삭제하시겠습니까?`)) {
            try {
                if (historyData) {
                    const yearDocRef = doc(dbService, 'history', `${historyData[decadIndex].date}`);
                    const yearDocSnap = await getDoc(yearDocRef);
        
                    if (yearDocSnap.exists()) {
                        const yearData = yearDocSnap.data();
                        const updatedContents = yearData.contentsArr.filter((item: any) => item.id !== id);
        
                        await updateDoc(yearDocRef, {
                            contentsArr: updatedContents,
                        });
        
                        alert("연혁 삭제가 완료되었습니다.");
                    }
                }
            } catch (error) {
                console.error("에러 발생: ", error);
                alert("연혁 삭제에 실패했습니다.");
            }
        }
    };

    // 게시물 수정
    const editHistory = (item: { id: number; date: string; content: string }) => {
        setEditingItem(item);
        setHistroyDate(item.date);
        setHistroyContent(item.content);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setHistroyDate("");
        setHistroyContent("");
    };

    const updateHistory = async () => {
        if (!editingItem) return;

        try {
            if (historyData) {
                const yearDocRef = doc(dbService, 'history', `${historyData[decadIndex].date}`);
                const yearDocSnap = await getDoc(yearDocRef);

                if (yearDocSnap.exists()) {
                    const yearData = yearDocSnap.data();
                    const updatedContents = yearData.contentsArr.map((item: any) => {
                        if (item.id === editingItem.id) {
                            return {
                                ...item,
                                date: histroyDate,
                                content: histroyContent,
                            };
                        }
                        return item;
                    });

                    await updateDoc(yearDocRef, {
                        contentsArr: updatedContents,
                    });

                    alert("연혁 수정이 완료되었습니다.");
                    setEditingItem(null);
                    setHistroyDate("");
                    setHistroyContent("");
                }
            }
        } catch (error) {
            console.error("에러 발생: ", error);
            alert("연혁 수정에 실패했습니다.");
        }
    };

    return(
        <div>
            <ChildTitle>연혁</ChildTitle>

            <div>
                <FormBox onSubmit={historyPost}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>날짜</InputGroup.Text>
                        <Form.Control aria-label="First name"
                            type="date"
                            name="date"
                            value={histroyDate}
                            onChange={contentText}
                        />
                        <Form.Control aria-label="Last name"
                            type="text"
                            name="date"
                            onChange={contentText}
                            value={histroyDate}
                            placeholder="예) 2023-01-01"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>내용</InputGroup.Text>
                        <Form.Control 
                            type="text"
                            name="content"
                            value={histroyContent}
                            onChange={contentText}
                        />
                    </InputGroup>

                    {editingItem ? (
                        <div>
                            <Button variant="outline-success" onClick={updateHistory}>
                                수정
                            </Button>
                            <Button variant="outline-danger" onClick={cancelEdit}>
                                취소
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline-secondary" type='submit'>
                            완료
                        </Button>
                    )}
                </FormBox>
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
                        <ListGroupItem key={i}>
                            {obj.date} {obj.content}
                            <div>
                                <Button 
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteHistory(obj.id, obj.content)}
                                >
                                    삭제
                                </Button>
                                <Button 
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => editHistory(obj)}
                                >
                                    수정
                                </Button>
                            </div>
                        </ListGroupItem>
                    ))
                } 
            </ListGroupStyled>
        </div>
    )
}
//2022-11-01 교회 2번째 이전
export default AdminHistory;

const NavStyled = styled(Nav)`
    width: 80%;
    margin: 0 auto;
`;

const ListGroupStyled = styled(ListGroup)`
    width: 80%;
    margin: 0 auto;
`;

const FormBox = styled.form`
    width: 600px;
    margin: 20px auto;
    text-align: end;
`;

const ListGroupItem = styled(ListGroup.Item)`
    display: flex;
    justify-content: space-between;
`;