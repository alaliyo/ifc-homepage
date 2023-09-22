import { Button, Form, InputGroup } from "react-bootstrap";
import { ScheduleData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, ListGroupStyled, ListGroupItem, NavBox, NavItem, PaginationBox, GoBun, PageNumber } from "./Styled";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase";

function AdminYear() {
    const scheduleData = ScheduleData();
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTitle, setScheduleTitle] = useState("");
    const [editingItem, setEditingItem] = useState<{ id: string; date: string; title: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(Math.max(1, Math.ceil(scheduleData.length / postsPerPage)));
    
    // 클라이언트 DATA
    const contentText = (e: any) => {
        const {
            target: { name, value}
        } = e;
        if (name === "date") {
            setScheduleDate(value);
        } else if (name === "content") {
            setScheduleTitle(value);
        }
    };

    //POST
    const onSubmit = async () => {
        try {
            await addDoc(collection(dbService, 'schedules'), {
                title: scheduleTitle,
                date: scheduleDate,
            });
            
            setScheduleDate("");
            setScheduleTitle("");
        } catch (error) {
            return alert(error);
        }
    };

    //DELETE
    const handleDelete = async (event_id: string) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteDoc(doc(dbService, "schedules", event_id));
                alert("일정 삭제가 완료되었습니다.");
            } catch (error) {
                console.error("에러 발생: ", error);
                alert("일정 삭제에 실패했습니다.");
            }
        }
    };

    //PUT
    const handlePut = async (event_id: string) => {
        if (!editingItem) return;

        try {
            await updateDoc(doc(dbService, 'schedules', event_id), {
                date: scheduleDate,
                title: scheduleTitle,
            });

            alert("일정 수정이 완료되었습니다.");
            setEditingItem(null);
            setScheduleDate("");
            setScheduleTitle("");
        } catch (error) {
            console.error("에러 발생: ", error);
            alert("일정 수정에 실패했습니다.");
        }
    };
    
    const editHistory = (item: { id: string; date: string; title: string }) => {
        setEditingItem(item);
        setScheduleDate(item.date);
        setScheduleTitle(item.title);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setScheduleDate("");
        setScheduleTitle("");
    };

    const calculateTotalPages = () => {
        const totalPages = Math.max(1, Math.ceil(scheduleData.length / postsPerPage));
        setTotalPages(totalPages);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        calculateTotalPages();
    }, [scheduleData]);

    const getPostsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return scheduleData.slice(startIndex, endIndex);
    };
    
    const PostsPageDowon = () => {
        currentPage > 1 && setCurrentPage(e => e -= 1);
    };

    const PostsPageUp = () => {
        currentPage < totalPages && setCurrentPage(e => e += 1);
    };

    const scheduleYear = ["2023"]

    // 게시물 post 
    const omgigi = async (e: any) => {
        e.preventDefault();

        for (let i = 0; i < scheduleData.length; i++) {
            const date = scheduleData[i].date;
            const title = scheduleData[i].title;

            try {
                const nowDate = Date.now();

                // 해당 연도의 데이터 가져오기
                const yearDocRef = doc(dbService, 'year-schedules', "2023");
                const yearDocSnap = await getDoc(yearDocRef);

                if (yearDocSnap.exists()) {
                    // 데이터가 이미 존재하는 경우 배열에 내용 추가
                    const yearData = yearDocSnap.data();
                    yearData.contentsArr.push({
                        id: nowDate,
                        date: date,
                        title: title,
                    });

                    // 기존 데이터 업데이트
                    await updateDoc(yearDocRef, {
                        contentsArr: yearData.contentsArr,
                    });
                } else {
                    // 데이터가 없는 경우 새로운 데이터 생성
                    await setDoc(yearDocRef, {
                    date: 2023,
                    contentsArr: [
                        {
                            id: nowDate,
                            date: date,
                            title: title,
                        }
                    ]
                    });
                }

                
            } catch (error) {
                return alert(error);
            }
        }
        alert("작업 완료");
    };

    return(
        <div>
            <ChildTitle>연중계획</ChildTitle>
            <button onClick={omgigi}>데이터 이전</button>
            <FormBox onSubmit={onSubmit}>
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
                        name="content"
                        value={scheduleTitle}
                        onChange={contentText}
                    />
                </InputGroup>

                {editingItem ? (
                    <div>
                        <Button variant="outline-success" onClick={() => handlePut(editingItem.id)}>
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
                {scheduleYear.map((year, i) => (
                    <NavItem key={i}>{year}</NavItem>
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
                                onClick={() => editHistory(obj)}
                            >
                                수정
                            </Button>
                            <Button 
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(obj.id)}
                            >
                                삭제
                            </Button>
                        </div>
                    </ListGroupItem>
                ))} 
            </ListGroupStyled>
            <PaginationBox>
                <GoBun onClick={PostsPageDowon}>◀</GoBun>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PageNumber key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                    </PageNumber>
                ))}
                <GoBun onClick={PostsPageUp}>▶</GoBun>
            </PaginationBox>
        </div>
    );
}

export default AdminYear;