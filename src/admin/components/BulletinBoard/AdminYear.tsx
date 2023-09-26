import { useState } from "react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Button, Form, InputGroup } from "react-bootstrap";
import { CommonPost, YearScheduleData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, ListGroupStyled, ListGroupItem, NavBox, NavItem, InputGroupCustom } from "./Styled";
import { dbService } from "../../../firebase";
import Pagination from "../../../components/Common/Pagination";

function AdminYear() {
    const yearScheduleData = YearScheduleData();
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTitle, setScheduleTitle] = useState("");
    const [scheduleContent, setScheduleContent] = useState("");
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
        } else if (name === "content") {
            setScheduleContent(value);
        }
    };

    // POST
    const postSchedule = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (scheduleDate === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (scheduleTitle === "") {
            return alert("제목을 입력해 주세요.");
        }

        try {
            const data = { date: scheduleDate, title: scheduleTitle, content: scheduleContent };
            const year = new Date(scheduleDate).getFullYear();
            CommonPost(data, "year-schedules", year);
            setScheduleDate("");
            setScheduleTitle("");
            setScheduleContent("");
        } catch (error) {
            return alert("새로 고침 후 작성 및 본사에 문의해주세요." + error);
        }
    }

    // DELETE
    const deleteSchedule = async (id: number, title: string) => {
        if (window.confirm(`"${title}" 게시물을 삭제하시겠습니까?`)) {
            try {
                if (yearScheduleData) {
                    const yearDocRef = doc(dbService, "year-schedules", `${yearScheduleData[arrIndex].date}`);
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
    const editSchedule = (item: { id: number; date: string; title: string; content: string; }) => {
        setEditingItem(item);
        setScheduleDate(item.date);
        setScheduleTitle(item.title);
        setScheduleContent(item.content);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setScheduleDate("");
        setScheduleTitle("");
        setScheduleContent("");
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
                                content: scheduleContent
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
                    setScheduleContent("");
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
                <InputGroupCustom >
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
                </InputGroupCustom>
                <InputGroupCustom>
                    <InputGroup.Text>제목</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="title"
                        value={scheduleTitle}
                        onChange={contentText}
                    />
                </InputGroupCustom>
                <InputGroupCustom>
                    <InputGroup.Text>내용</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="content"
                        value={scheduleContent}
                        onChange={contentText}
                    />
                </InputGroupCustom>

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