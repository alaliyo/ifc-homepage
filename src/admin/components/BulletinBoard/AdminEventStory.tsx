import { Button, Form, InputGroup } from "react-bootstrap";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, InputGroupCustom, ListGroupItem, ListGroupStyled, NavBox, NavItem } from "./Styled";
import { useState } from "react";
import { uploadImage, DeleteImages } from "../../../utils/storageService";
import { CommonDel, CommonPost, CommonPutImg, EventStoryData, EventStoryDataProps } from "../../../utils/dbService";
import Loading from "../Common/Loading";
import Pagination from "../../../components/Common/Pagination";

interface Props {
    date: string;
    title: string;
    content?: string;
    imgUrls: any;
}

function AdminEventStory() {
    const eventStoryData = EventStoryData();
    const [postDate, setPostDate] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [imgs, setImgs] = useState<Array<File>>([]);
    const [urls, setUrls] = useState<Array<string>>([]);
    const [arrIndex, setArrIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [editingItem, setEditingItem] = useState<EventStoryDataProps | null>(null);
    const [loadingBoolen, setLoadingBoolen] = useState(false);
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (eventStoryData && eventStoryData.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = eventStoryData[arrIndex].contentsArr.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
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
            target: { name, value, files }
        } = e;

        if (name === "date") {
            setPostDate(value);
        } else if (name === "title") {
            setPostTitle(value);
        } else if (name === "content") {
            setPostContent(value);
        } else if (name === "img") {
            setImgs(Array.from(files));
        }
    };

    // POST
    const postStory = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (postDate === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (postTitle === "") {
            return alert("제목을 입력해 주세요.");
        } else if (imgs.length === 0) {
            return alert("사진을 첨부해 주세요.");
        }

        setLoadingBoolen(true)
        const imageUrls = await uploadImage("event-story", `${postDate}/${postTitle}`, imgs);
        const year5 = Math.floor(new Date(postDate).getFullYear() / 5) * 5;
        const data: Props = { title: postTitle, date: postDate, imgUrls: imageUrls };
        
        if (postContent.length > 0) {
            const LineBreaks = postContent.replace(/\n/g, '\\n');
            data.content = LineBreaks;
        }
        
        await CommonPost(data, "event-story", year5);
        setLoadingBoolen(false)
        setPostDate("");
        setPostTitle("");
        setPostContent("");
        setImgs([]);
    };

    // DEL
    const deleteStory = async (id: number, date: string, imgUrls: Array<string>) => {
        if (window.confirm(`"${date}" 주보를 삭제하시겠습니까?`)) {
            if (eventStoryData) {
                CommonDel("event-story", `${eventStoryData[arrIndex].date}`, id, setArrIndex);
                DeleteImages(imgUrls);
            }
        }
    };

    // 게시물 수정 버튼
    const editSchedule = (item: EventStoryDataProps) => {
        setEditingItem(item);
        setPostDate(item.date);
        setPostTitle(item.title)
        if (item.content) {
            setPostContent(item.content.replace(/\\n/g, "\n"));
        }
        setUrls(item.imgUrls);
        setImgs([]);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setPostDate("");
        setPostTitle("");
        setPostContent("");
        setUrls([]);
        setImgs([]);
    };

    // PUT
    const putStory = async () => {
        if (eventStoryData) {
            setLoadingBoolen(true);
            const data: Props = { title: postTitle, date: postDate, imgUrls: urls };
            
            if (postContent.length > 0) {
                const LineBreaks = postContent.replace(/\n/g, '\\n');
                data.content = LineBreaks;
            }

            CommonPutImg(editingItem, "event-story", `${eventStoryData[arrIndex].date}`, data, imgs);
            setLoadingBoolen(false);
            cancelEdit();
        }
    };

    return(
        <div>
            <ChildTitle>게시물</ChildTitle>
            
            <FormBox>
                <InputGroupCustom>
                    <InputGroup.Text>날짜</InputGroup.Text>
                    <Form.Control aria-label="First name"
                        type="date"
                        name="date"
                        value={postDate}
                        onChange={contentText}
                    />
                    <Form.Control aria-label="Last name"
                        type="text"
                        name="date"
                        value={postDate}
                        onChange={contentText}
                        placeholder="예) 2023-01-01"
                    />
                </InputGroupCustom>
                <InputGroupCustom>
                    <InputGroup.Text>재목</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="title"
                        value={postTitle}
                        onChange={contentText}
                    />
                    <Form.Control 
                        type="file"
                        name="img"
                        onChange={contentText}
                        multiple
                    />
                </InputGroupCustom>
                <InputGroupCustom>
                    <InputGroup.Text>
                        내<br />용
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        as="textarea"
                        name="content"
                        value={postContent}
                        onChange={contentText}
                        style={{
                            height: "150px",
                            resize: "none",
                            overflow: "auto"
                        }}
                    />
                </InputGroupCustom>
                
                {editingItem ? (
                    <div>
                        <Button
                            variant="outline-success"
                            onClick={() => putStory()}
                        >
                            수정
                        </Button>
                        <Button variant="outline-danger" onClick={cancelEdit}>
                            취소
                        </Button>
                    </div>
                ) : (
                    <Button variant="outline-secondary" onClick={postStory}>완료</Button>
                )}
            </FormBox>

            <NavBox>
                {eventStoryData && eventStoryData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date} ~ {obj.date + 5}</NavItem>
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
                                onClick={() => deleteStory(obj.id, obj.date, obj.imgUrls)}
                            >
                                삭제
                            </Button>
                        </div>
                    </ListGroupItem>
                ))} 
            </ListGroupStyled>
            
            <Pagination 
                data={eventStoryData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />

            {loadingBoolen && <Loading />}
        </div>
    );
}

export default AdminEventStory;