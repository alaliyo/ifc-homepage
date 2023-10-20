import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { CommonDel, CommonPost, CommonPut, ScheduleDataprops, YearScheduleData } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, ListGroupStyled, ListGroupItem, NavBox, NavItem, InputGroupCustom } from "./Styled";
import Pagination from "../../../components/Common/Pagination";
import Loading from "../Common/Loading";

function AdminYear() {
    const yearScheduleData = YearScheduleData();
    const [scheduleStart, setScheduleStart] = useState("");
    const [scheduleEnd, setScheduleEnd] = useState("");
    const [scheduleTitle, setScheduleTitle] = useState("");
    const [scheduleContent, setScheduleContent] = useState("");
    const [arrIndex, setArrIndex] = useState(0);
    const [editingItem, setEditingItem] = useState<{ id: number; start: string; end: string; title: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [loadingBoolen, setLoadingBoolen] = useState(false);
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (yearScheduleData && yearScheduleData.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = yearScheduleData[arrIndex].contentsArr.sort((a, b) => Number(new Date(a.start)) - Number(new Date(b.start)));
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
        if (name === "start") {
            setScheduleStart(value);
        } else if (name === "end") {
            setScheduleEnd(value);
        } else if (name === "title") {
            setScheduleTitle(value);
        } else if (name === "content") {
            setScheduleContent(value);
        }
    };

    // POST
    const postSchedule = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (scheduleStart === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (scheduleTitle === "") {
            return alert("제목을 입력해 주세요.");
        }

        setLoadingBoolen(true);
        const year = new Date(scheduleStart).getFullYear();
        const data = { start: scheduleStart, end: scheduleEnd, title: scheduleTitle, content: scheduleContent };
        await CommonPost(data, "year-schedules", year);
        setLoadingBoolen(false);
        setScheduleStart("");
        setScheduleEnd("");
        setScheduleTitle("");
        setScheduleContent("");
    }

    // DEL
    const deleteSchedule = async (id: number, content: string) => {
        if (window.confirm(`"${content}" 연혁을 삭제하시겠습니까?`)) {
            if (yearScheduleData) {
                CommonDel("year-schedules", `${yearScheduleData[arrIndex].date}`, id, setArrIndex);
            }
        }
    };
    
    // 게시물 수정 버튼
    const editSchedule = (item: ScheduleDataprops) => {
        setEditingItem(item);
        setScheduleStart(item.start);
        setScheduleEnd(item.end);
        setScheduleTitle(item.title);
        item.content && setScheduleContent(item.content);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setScheduleStart("");
        setScheduleEnd("");
        setScheduleTitle("");
        setScheduleContent("");
    };

    // PUT
    const putSchedule = async () => {
        if (yearScheduleData) {
            setLoadingBoolen(true);
            const data = { start: scheduleStart, end: scheduleEnd, title: scheduleTitle, content: scheduleContent };
            await CommonPut(editingItem, "year-schedules", `${yearScheduleData[arrIndex].date}`, data);
            setLoadingBoolen(false);
            cancelEdit();
        }
    };
 
    return(
        <div>
            <ChildTitle>연중계획</ChildTitle>

            <FormBox onSubmit={postSchedule}>
                <InputGroupCustom >
                    <InputGroup.Text>시작</InputGroup.Text>
                    <Form.Control aria-label="First name"
                        type="date"
                        name="start"
                        value={scheduleStart}
                        onChange={contentText}
                    />
                    <InputGroup.Text>끝</InputGroup.Text>
                    <Form.Control aria-label="Last name"
                        type="date"
                        name="end"
                        onChange={contentText}
                        value={scheduleEnd}
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
                    <Button variant="outline-secondary" type='submit'>완료</Button>
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
                        {obj.start} {obj.title}
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

            {loadingBoolen && <Loading />}
        </div>
    );
}

export default AdminYear;