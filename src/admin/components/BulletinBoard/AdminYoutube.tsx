import { useEffect, useState } from "react";
import { FormBox, ListGroupItem, ListGroupStyled, NavBox, NavItem } from "./Styled";
import { Button, Form, InputGroup } from "react-bootstrap";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase";
import styled from "styled-components";
import { YoutubeData, YoutubeDataProps, YoutubeDataArrayProps, CommonPost } from "../../../utils/dbService";
import Pagination from "../../../components/Common/Pagination";

function AdminYoutube() {
    const [getData, setGetData] = useState<YoutubeDataArrayProps[] | undefined>();
    const [DBPath, setDBPath] = useState("youtube-kr");
    const [youtubeDate, setYoutubeDate] = useState("");
    const [youtubeTitle, setYoutubeTitle] = useState("");
    const [youtubeBible, setYoutubeBible] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [arrIndex, setArrIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [editingItem, setEditingItem] = useState<YoutubeDataProps | null>(null);
    
    const DropdownChange = (e: any) => {
        setDBPath(e.target.value);
    };

    const arrIndexChange = (i: number) => {
        setArrIndex(i)
    };

    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (getData && getData.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = getData[arrIndex].contentsArr.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
            return DataSort.slice(startIndex, endIndex);
        }
        return [];
    }; 

    const TextChange = (e: { target: { name: string; value: string; }; }) => {
        const {
            target: { name, value}
        } = e;
        if (name === "date") {
            setYoutubeDate(value);
        } else if (name === "title") {
            setYoutubeTitle(value);
        } else if (name === "bible") {
            setYoutubeBible(value);
        } else if (name === "url") {
            setYoutubeUrl(value);
        }
    };

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const youtubeData = await YoutubeData(DBPath);
                setGetData(youtubeData ? youtubeData: []);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };
        
        fetchData();
    }, [DBPath, youtubeDate]);

    // POST
    const postYoutube = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (youtubeDate === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (youtubeTitle === "") {
            return alert("제목을 입력해 주세요.");
        } else if (youtubeBible === "") {
            return alert("성경 구절을 입력해 주세요.");
        } else if (youtubeUrl === "") {
            return alert("영상 url을 입력해 주세요.");
        }

        try {
            const data = { date: youtubeDate, title: youtubeTitle, bible: youtubeBible, url:youtubeUrl };
            const year = new Date(youtubeDate).getFullYear();
            CommonPost(data, DBPath, year);
            setYoutubeDate("");
            setYoutubeTitle("");
            setYoutubeBible("");
            setYoutubeUrl("");
        } catch (error) {
            return alert("새로 고침 후 작성 및 본사에 문의해주세요." + error);
        }
    }

    // DELETE
    const deleteYoutube = async (id: number, title: string) => {
        if (window.confirm(`"${title}" 게시물을 삭제하시겠습니까?`)) {
            try {
                if (getData) {
                    const yearDocRef = doc(dbService, DBPath, `${getData[arrIndex].date}`);
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
        
                        alert("게시물 삭제되었습니다.");
                    }
                }
            } catch (error) {
                console.error("에러 발생: ", error);
                alert("게시물 삭제에 실패했습니다.");
            }
        }
    };

    // 게시물 수정 버튼
    const editSchedule = (item: YoutubeDataProps) => {
        setEditingItem(item);
        setYoutubeDate(item.date);
        setYoutubeTitle(item.title);
        setYoutubeBible(item.bible);
        setYoutubeUrl(item.url)
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setYoutubeDate("");
        setYoutubeTitle("");
        setYoutubeBible("");
        setYoutubeUrl("");
    };

    // PUT
    const putYoutube = async () => {
        if (!editingItem) return;

        try {
            if (getData) {
                const yearDocRef = doc(dbService, DBPath, `${getData[arrIndex].date}`);
                const yearDocSnap = await getDoc(yearDocRef);

                if (yearDocSnap.exists()) {
                    const yearData = yearDocSnap.data();
                    const updatedContents = yearData.contentsArr.map((item: any) => {
                        if (item.id === editingItem.id) {
                            return {
                                ...item,
                                date: youtubeDate,
                                title: youtubeTitle,
                                bible: youtubeBible,
                                url: youtubeUrl,
                            };
                        }
                        return item;
                    });

                    await updateDoc(yearDocRef, {
                        contentsArr: updatedContents,
                    });

                    alert("연혁 수정되었습니다.");
                    setEditingItem(null);
                    setYoutubeDate("");
                    setYoutubeTitle("");
                    setYoutubeBible("");
                    setYoutubeUrl("");
                }
            }
        } catch (error) {
            console.error("에러 발생: ", error);
            alert("연혁 수정에 실패했습니다.");
        }
    };

    return(
        <div>
            <TitleBox>
                <h3>유튜브</h3>
                <select value={DBPath} onChange={DropdownChange}>
                    <option value="youtube-kr">한글</option>
                    <option value="youtube-en">영어</option>
                </select>
            </TitleBox>
            <FormBox onSubmit={postYoutube}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>날짜</InputGroup.Text>
                    <Form.Control aria-label="First name"
                        type="date"
                        name="date"
                        value={youtubeDate}
                        onChange={TextChange}
                    />
                    <Form.Control aria-label="Last name"
                        type="text"
                        name="date"
                        value={youtubeDate}
                        onChange={TextChange}
                        placeholder="예) 2023-01-01"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>제목</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="title"
                        value={youtubeTitle}
                        onChange={TextChange}
                    />
                    <InputGroup.Text>성경</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="bible"
                        value={youtubeBible}
                        onChange={TextChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>url</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="url"
                        value={youtubeUrl}
                        onChange={TextChange}
                    />
                </InputGroup>

                {editingItem ? (
                    <div>
                        <Button variant="outline-success" onClick={putYoutube}>
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
                {getData && getData.length > 0 && getData[0].contentsArr.length > 0 && getData.map((obj, i) => (
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
                                    onClick={() => deleteYoutube(obj.id, obj.title)}
                                >
                                    삭제
                                </Button>
                            </div> 
                        </ListGroupItem>
                    ))
                } 
            </ListGroupStyled>

            <Pagination 
                data={getData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </div>
    );
}

export default AdminYoutube;

const TitleBox = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #afafaf;
    display: flex;
    justify-content: center;
    align-items: center;
`;