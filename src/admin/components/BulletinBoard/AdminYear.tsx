import { useState } from "react";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Button, Form, InputGroup } from "react-bootstrap";
import { YearScheduleData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, ListGroupStyled, ListGroupItem, NavBox, NavItem } from "./Styled";
import { dbService } from "../../../firebase";
import Pagination from "../../../components/Common/Pagination";

function AdminYear() {
    const yearScheduleData = YearScheduleData();
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTitle, setScheduleTitle] = useState("");
    const [arrIndex, setArrIndex] = useState(0);
    const [editingItem, setEditingItem] = useState<{ id: number; date: string; title: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (yearScheduleData) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = yearScheduleData[arrIndex].contentsArr.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
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
            setScheduleDate(value);
        } else if (name === "title") {
            setScheduleTitle(value);
        }
    };

    // POST
    const postSchedule = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (scheduleDate === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (scheduleTitle === "") {
            return alert("내용을 입력해 주세요.");
        }

        try {
            const year = new Date(scheduleDate).getFullYear();
            const nowDate = Date.now();
            const yearDocRef = doc(dbService, "year-schedules", `${year}`);
            const yearDocSnap = await getDoc(yearDocRef);

            if (yearDocSnap.exists()) {
                // 데이터가 이미 존재하는 경우 배열에 내용 추가
                const yearData = yearDocSnap.data();
                yearData.contentsArr.push({
                    id: nowDate,
                    date: scheduleDate,
                    title: scheduleTitle,
                });

                // 기존 데이터 업데이트
                await updateDoc(yearDocRef, {
                    contentsArr: yearData.contentsArr,
                });
            } else {
                // 데이터가 없는 경우 새로운 데이터 생성
                await setDoc(yearDocRef, {
                date: year,
                contentsArr: [
                    {
                        id: nowDate,
                        date: scheduleDate,
                        title: scheduleTitle,
                    }
                ]
                });
            }
            alert("연중계획이 추가 되었습니다.");
        } catch (error) {
            return alert("새로고침 후 다시 시도해주세요" + error);
        }
    };

    // DELETE
    const deleteSchedule = async (id: number, title: string) => {
        if (window.confirm(`"${title}" 게시물을 삭제하시겠습니까?`)) {
            try {
                if (yearScheduleData) {
                    const yearDocRef = doc(dbService, "year-schedules", `${yearScheduleData[arrIndex].date}`);
                    const yearDocSnap = await getDoc(yearDocRef);
                    console.log(yearDocSnap.exists())
                    if (yearDocSnap.exists()) {
                        const yearData = yearDocSnap.data();
                        const updatedContents = yearData.contentsArr.filter((item: any) => item.id !== id);
        
                        if (updatedContents.length === 0) {
                            setArrIndex(0);
                            await deleteDoc(yearDocRef);
                        } else {
                            await updateDoc(yearDocRef, {contentsArr: updatedContents});
                        }
        
                        alert("게시물 삭제가 완료되었습니다.");
                    }
                }
            } catch (error) {
                console.error("에러 발생: ", error);
                alert("게시물 삭제에 실패했습니다.");
            }
        }
    };
    
    // 게시물 수정 버튼
    const editSchedule = (item: { id: number; date: string; title: string }) => {
        setEditingItem(item);
        setScheduleDate(item.date);
        setScheduleTitle(item.title);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setScheduleDate("");
        setScheduleTitle("");
    };
    
    // PUT
    const putSchedule = async () => {
        if (!editingItem) return;

        try {
            if (yearScheduleData) {
                const yearDocRef = doc(dbService, "year-schedules", `${yearScheduleData[arrIndex].date}`);
                const yearDocSnap = await getDoc(yearDocRef);

                if (yearDocSnap.exists()) {
                    const yearData = yearDocSnap.data();
                    const updatedContents = yearData.contentsArr.map((item: any) => {
                        if (item.id === editingItem.id) {
                            return {
                                ...item,
                                date: scheduleDate,
                                title: scheduleTitle,
                            };
                        }
                        return item;
                    });

                    await updateDoc(yearDocRef, {
                        contentsArr: updatedContents,
                    });

                    alert("연혁 수정이 완료되었습니다.");
                    setEditingItem(null);
                    setScheduleDate("");
                    setScheduleTitle("");
                }
            }
        } catch (error) {
            console.error("에러 발생: ", error);
            alert("연혁 수정에 실패했습니다.");
        }
    };

    return(
        <div>
            <ChildTitle>연중계획</ChildTitle>

            <FormBox onSubmit={postSchedule}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>날짜</InputGroup.Text>
                    <Form.Control aria-label="First name"
                        type="date"
                        name="date"
                        value={scheduleDate}
                        onChange={contentText}
                    />
                    <Form.Control aria-label="Last name"
                        type="text"
                        name="date"
                        onChange={contentText}
                        value={scheduleDate}
                        placeholder="예) 2023-01-01"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>내용</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="title"
                        value={scheduleTitle}
                        onChange={contentText}
                    />
                </InputGroup>

                {editingItem ? (
                    <div>
                        <Button variant="outline-success" onClick={putSchedule}>
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

            <NavBox>
                {yearScheduleData && yearScheduleData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date}</NavItem>
                ))}
            </NavBox>

            <ListGroupStyled>
                {getPostsForCurrentPage().map((obj, i) => (
                    <ListGroupItem key={i}>
                        {obj.date} {obj.title}
                        <div>                           
                            <Button 
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => editSchedule(obj)}
                            >
                                수정
                            </Button>
                            <Button 
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteSchedule(obj.id, obj.title)}
                            >
                                삭제
                            </Button>
                        </div>
                    </ListGroupItem>
                ))} 
            </ListGroupStyled>

            <Pagination 
                data={yearScheduleData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </div>
    );
}

export default AdminYear;