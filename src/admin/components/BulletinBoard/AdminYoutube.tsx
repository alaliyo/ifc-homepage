import { useEffect, useState } from "react";
import { FormBox, ListGroupItem, ListGroupStyled, NavBox, NavItem } from "./Styled";
import { Button, Form, InputGroup } from "react-bootstrap";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase";
import styled from "styled-components";
import { YoutubeData, YoutubeDataProps, YoutubeDataArrayProps } from "../../../utils/dbService";
import Pagination from "../../../components/Common/Pagination";

function AdminYoutube() {
    const [getData, setGetData] = useState<YoutubeDataArrayProps[] | undefined>();
    const [DBPath, setDBPath] = useState("youtube-kr");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [bible, setBible] = useState("");
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
            setDate(value);
        } else if (name === "title") {
            setTitle(value);
        } else if (name === "bible") {
            setBible(value);
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
    }, [DBPath]);

    // POST
    const postYoutube = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (date === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (title === "") {
            return alert("제목을 입력해 주세요.");
        } else if (bible === "") {
            return alert("성경 구절을 입력해 주세요.");
        } else if (youtubeUrl === "") {
            return alert("영상 url을 입력해 주세요.");
        }

        try {
            const year = new Date(date).getFullYear();
            const nowDate = Date.now();
            const decadDocRef = doc(dbService, DBPath, `${year}`);
            const deacadDocSnap = await getDoc(decadDocRef);

            if (deacadDocSnap.exists()) {
                // 데이터가 이미 존재하는 경우 배열에 내용 추가
                const yearData = deacadDocSnap.data();
                yearData.contentsArr.push({
                    id: nowDate,
                    date: date,
                    title: title,
                    bible: bible,
                    url: youtubeUrl,
                });

                // 기존 데이터 업데이트
                await updateDoc(decadDocRef, {
                    contentsArr: yearData.contentsArr,
                });
            } else {
                // 데이터가 없는 경우 새로운 데이터 생성
                await setDoc(decadDocRef, {
                date: year,
                contentsArr: [
                    {
                        id: nowDate,
                        date: date,
                        title: title,
                        bible: bible,
                        url: youtubeUrl,
                    }
                ]
                });
            }

            alert("게시물 작성이 완료 되었습니다.");
            setDate("");
            setTitle("");
            setBible("");
            setYoutubeUrl("");

            const youtubeData = await YoutubeData(DBPath);
            setGetData(youtubeData ? youtubeData : []);
        } catch (error) {
            return alert("새로고침 후 다시 시도해주세요" + error);
        }
    };

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
                        const youtubeData = await YoutubeData(DBPath);
                        setGetData(youtubeData ? youtubeData : []);
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
        setDate(item.date);
        setTitle(item.title);
        setBible(item.bible);
        setYoutubeUrl(item.url);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setDate("");
        setTitle("");
        setBible("");
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
                                date: date,
                                title: title,
                                bible: bible,
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
                    setDate("");
                    setTitle("");
                    setBible("");
                    setYoutubeUrl("");

                    const youtubeData = await YoutubeData(DBPath);
                    setGetData(youtubeData ? youtubeData : []);
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
                        value={date}
                        onChange={TextChange}
                    />
                    <Form.Control aria-label="Last name"
                        type="text"
                        name="date"
                        value={date}
                        onChange={TextChange}
                        placeholder="예) 2023-01-01"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>제목</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="title"
                        value={title}
                        onChange={TextChange}
                    />
                    <InputGroup.Text>성경</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="bible"
                        value={bible}
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
                ) : <Button variant="outline-secondary" type='submit'>완료</Button>}
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