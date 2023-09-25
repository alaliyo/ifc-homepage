import { useState } from "react";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Button, Form, InputGroup } from "react-bootstrap";
import { HistoryData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { dbService } from "../../../firebase";
import { FormBox, ListGroupItem, ListGroupStyled, NavBox, NavItem } from "./Styled";
import Pagination from "../../../components/Common/Pagination";

function AdminHistory() {
    const historyData = HistoryData();
    const [histroyDate, setHistroyDate] = useState("");
    const [histroyContent, setHistroyContent] = useState("");
    const [arrIndex, setArrIndex] = useState(0);
    const [editingItem, setEditingItem] = useState<{ id: number; date: string; content: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (historyData) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = historyData[arrIndex].contentsArr.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
            return DataSort.slice(startIndex, endIndex);
        }
        return [];
    };

    const arrIndexChange = (i: number) => {
        setArrIndex(i)
    };

    // 클라이언트 DATA
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

    // POST
    const postHistory = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (histroyDate === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (histroyContent === "") {
            return alert("내용을 입력해 주세요.");
        }

        try {
            const decad = Math.floor(new Date(histroyDate).getFullYear() / 10) * 10;
            const nowDate = Date.now();
            const decadDocRef = doc(dbService, 'history', `${decad}`);
            const deacadDocSnap = await getDoc(decadDocRef);

            if (deacadDocSnap.exists()) {
                // 데이터가 이미 존재하는 경우 배열에 내용 추가
                const yearData = deacadDocSnap.data();
                yearData.contentsArr.push({
                    id: nowDate,
                    date: histroyDate,
                    content: histroyContent,
                });

                // 기존 데이터 업데이트
                await updateDoc(decadDocRef, {
                    contentsArr: yearData.contentsArr,
                });
            } else {
                // 데이터가 없는 경우 새로운 데이터 생성
                await setDoc(decadDocRef, {
                date: decad,
                contentsArr: [
                    {
                        id: nowDate,
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
            return alert("새로고침 후 다시 시도해주세요" + error);
        }
    };

    // DELETE
    const deleteHistory = async (id: number, content: string) => {
        if (window.confirm(`"${content}" 연혁을 삭제하시겠습니까?`)) {
            try {
                if (historyData) {
                    const yearDocRef = doc(dbService, 'history', `${historyData[arrIndex].date}`);
                    const yearDocSnap = await getDoc(yearDocRef);
        
                    if (yearDocSnap.exists()) {
                        const yearData = yearDocSnap.data();
                        const updatedContents = yearData.contentsArr.filter((item: any) => item.id !== id);
        
                        if (updatedContents.length === 0) {
                            setArrIndex(0);
                            await deleteDoc(yearDocRef);
                        } else {
                            await updateDoc(yearDocRef, {contentsArr: updatedContents});
                        }
        
                        alert("연혁 삭제가 완료되었습니다.");
                    }
                }
            } catch (error) {
                console.error("에러 발생: ", error);
                alert("연혁 삭제에 실패했습니다.");
            }
        }
    };

    // 게시물 수정 버튼
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

    // PUT
    const putHistory = async () => {
        if (!editingItem) return;

        try {
            if (historyData) {
                const yearDocRef = doc(dbService, 'history', `${historyData[arrIndex].date}`);
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
                <FormBox onSubmit={postHistory}>
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
                            <Button variant="outline-success" onClick={putHistory}>수정</Button>
                            <Button variant="outline-danger" onClick={cancelEdit}>취소</Button>
                        </div>
                    ) : (
                        <Button variant="outline-secondary" type='submit'>완료</Button>
                    )}
                </FormBox>
            </div>

            <NavBox>
                {historyData && historyData[0].contentsArr.length > 0 && historyData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date}`s</NavItem>
                ))}
            </NavBox>

            <ListGroupStyled>
                {getPostsForCurrentPage().map((obj, i) => (
                        <ListGroupItem key={i}>
                            {obj.date} {obj.content}
                            <div>
                                <Button 
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => editHistory(obj)}
                                >
                                    수정
                                </Button>
                                <Button 
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteHistory(obj.id, obj.content)}
                                >
                                    삭제
                                </Button>
                            </div>
                        </ListGroupItem>
                    ))
                } 
            </ListGroupStyled>

            <Pagination 
                data={historyData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </div>
    )
}

export default AdminHistory;