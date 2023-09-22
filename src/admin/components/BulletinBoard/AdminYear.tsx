import { Button, Form, InputGroup, Nav, NavLink } from "react-bootstrap";
import { ScheduleData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, ListGroupStyled, ListGroupItem, NavStyled, PaginationBox, GoBun, PageNumber } from "./Styled";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
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

    return(
        <div>
            <ChildTitle>연중계획</ChildTitle>
            
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

            <NavStyled fill variant="tabs" >
                {scheduleYear.map((year, i) => (
                    <Nav.Item key={i}>
                        <NavLink>{year}</NavLink>
                    </Nav.Item>
                ))}
            </NavStyled>

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