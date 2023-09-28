import { Button, Form, InputGroup } from "react-bootstrap";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, ListGroupItem, ListGroupStyled, NavBox, NavItem } from "./Styled";
import { useState } from "react";
import { CommonPost, WeeklyData, WeekDataPoops, CommonDel } from "../../../utils/dbService";
import { DeleteImages, uploadImage } from '../../../utils/storageService';
import Pagination from "../../../components/Common/Pagination";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase";

function AdminWeek() {
    const weeklyData = WeeklyData();
    const [weeklyDate, setWeeklyDate] = useState("");
    const [imgs, setImgs] = useState<Array<File>>([]);
    const [arrIndex, setArrIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [editingItem, setEditingItem] = useState<WeekDataPoops | null>(null);
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (weeklyData && weeklyData.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const DataSort = weeklyData[arrIndex].contentsArr.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
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
            setWeeklyDate(value);
        } else if (name === "img") {
            setImgs(Array.from(files));
        }
    };

    // POST
    const postWeek = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (weeklyDate === "") {
            return alert("날짜를 입력해 주세요.");
        } else if (imgs.length === 0) {
            return alert("사진을 첨부해 주세요.");
        }

        const imageUrls = await uploadImage(weeklyDate, imgs);
        const year = new Date(weeklyDate).getFullYear();
        const data = { date: weeklyDate, imgUrls: imageUrls };
        await CommonPost(data, "week", year);
        setWeeklyDate("");
        setImgs([]);
    };
    
    // DEL
    const deleteWeek = async (id: number, date: string, imgUrls: Array<string>) => {
        if (window.confirm(`"${date}" 주보를 삭제하시겠습니까?`)) {
            if (weeklyData) {
                CommonDel("week", `${weeklyData[arrIndex].date}`, id, setArrIndex);
                DeleteImages(imgUrls);
            }
        }
    };

    // 게시물 수정 버튼
    const editSchedule = (item: WeekDataPoops) => {
        setEditingItem(item);
        setWeeklyDate(item.date);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setWeeklyDate("");
    };

    // PUT
    const putWeek = async () => {
        if (!editingItem) return;
        
        if (weeklyData && weeklyData.length > 0) {
            try {
                const yearDocRef = doc(dbService, "week", weeklyData[arrIndex].date.toString());
                const yearDocSnap = await getDoc(yearDocRef);
                if (yearDocSnap.exists()) {
                    const yearData = yearDocSnap.data();
                    const updatedContents = yearData.contentsArr.map(async (item: any) => {
                        if (item.id === editingItem.id) {
                            if (imgs.length > 0) {
                                const imageUrls = await uploadImage(weeklyDate, imgs);
                                DeleteImages(editingItem.imgUrls);
                                return {
                                    ...item,
                                    date: weeklyDate,
                                    imgUrls: imageUrls,
                                };
                            } else {
                                return {
                                    ...item,
                                    date: weeklyDate,
                                };
                            }  
                        }
                        return item;
                    });
        
                    const updatedContentsData = await Promise.all(updatedContents);

                    await updateDoc(yearDocRef, {
                        contentsArr: updatedContentsData,
                    });
        
                    alert("수정이 완료되었습니다.");

                    setWeeklyDate("");
                    setImgs([]);
                }
            } catch (error) {
                return alert("새로고침 후 다시 시도해주세요" + error);
            }
        }
    };

    return(
        <div>
            <ChildTitle>주보</ChildTitle>
            <FormBox onSubmit={postWeek}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>날짜</InputGroup.Text>
                    <Form.Control aria-label="First name"
                        type="date"
                        name="date"
                        value={weeklyDate}
                        onChange={contentText}
                    />
                    <Form.Control aria-label="Last name"
                        type="text"
                        name="date"
                        value={weeklyDate}
                        onChange={contentText}
                        placeholder="예) 2023-01-01"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control 
                        type="file"
                        name="img"
                        onChange={contentText}
                        multiple
                    />
                </InputGroup>
                {editingItem ? (
                    <div>
                        <Button
                            variant="outline-success"
                            onClick={() => putWeek()}
                        >
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
                {weeklyData && weeklyData.map((obj, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(i)}>{obj.date}</NavItem>
                ))}
            </NavBox>

            <ListGroupStyled>
                {getPostsForCurrentPage().map((obj, i) => (
                    <ListGroupItem key={i}>
                        {obj.date} 주보
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
                                onClick={() => deleteWeek(obj.id, obj.date, obj.imgUrls)}
                            >
                                삭제
                            </Button>
                        </div>
                    </ListGroupItem>
                ))} 
            </ListGroupStyled>
            
            <Pagination 
                data={weeklyData}
                arrIndex={arrIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
            />
        </div>
    )
}

export default AdminWeek;