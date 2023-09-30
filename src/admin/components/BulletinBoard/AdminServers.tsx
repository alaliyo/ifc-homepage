import { useState } from "react";
import { CommonDel, CommonPutImg, ServersData, ServersDataPoops } from "../../../utils/dbService";
import { ChildTitle } from "../../style/CommonStyled";
import { FormBox, InputGroupCustom, ListGroupItem, ListGroupStyled, NavBox, NavItem } from "./Styled";
import { Button, Form, InputGroup } from "react-bootstrap";
import { DeleteImages, uploadImage } from "../../../utils/storageService";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase";
import Loading from "../Common/Loading";

function AdminServers() {
    const serversData = ServersData();
    const [serversId, setServersId] = useState<number>(0);
    const [serversName, setServersName] = useState("");
    const [serversImg, setServersImg] = useState<File[]>([]);
    const [urls, setUrls] = useState<Array<string>>([])
    const [arrIndex, setArrIndex] = useState(0);
    const [editingItem, setEditingItem] = useState<ServersDataPoops | null>(null);
    const [DBPath, setDBPath] = useState("cooperative-pastor");
    const [loadingBoolen, setLoadingBoolen] = useState(false);
    
    const DropdownChange = (e: any) => {
        const selectedIndex = e.target.selectedIndex;
        setDBPath(e.target.value);
        setArrIndex(selectedIndex);
    };

    const arrIndexChange = (i: number) => {
        if (serversData) {
            setArrIndex(i);
            const selectedDBPath = serversData[i]?.title || "cooperative-pastor";
            setDBPath(selectedDBPath);
        }
    };

    // 클라이언트 DATA
    const contentText = (e: any) => {
        const {
            target: { name, value, files }
        } = e;
        if (name === "id") {
            setServersId(value);
        } else if (name === "name") {
            setServersName(value);
        } else if (name === "img") {
            setServersImg(Array.from(files));
        }
    };

    // POST
    const postServers = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!(serversId >= 0)) {
            return alert("순서를 입력해주세요.");
        } else if (serversName === "") {
            return alert("제목을 입력해주세요.");
        } else if (serversImg.length === 0) {
            return alert("이미지를 첨부해주세요.")
        } 
        try {
            setLoadingBoolen(true);
            const decadDocRef = doc(dbService, "servers", `${DBPath}`);
            const imageUrl = await uploadImage("servers", serversName, serversImg);
            const deacadDocSnap = await getDoc(decadDocRef);
            
            const data = { id: Number(serversId), imgUrls: imageUrl, name: serversName };
            if (deacadDocSnap.exists()) {
                // 데이터가 이미 존재하는 경우 배열에 내용 추가
                const documentData = deacadDocSnap.data();
                documentData.contentsArr.push(data);
    
                // 기존 데이터 업데이트
                await updateDoc(decadDocRef, {
                    contentsArr: documentData.contentsArr,
                });
            }
    
            alert("작성이 완료되었습니다.");
            setLoadingBoolen(false);
            setServersId(0);
            setServersName("");
            setServersImg([]);
        } catch (error) {
            return alert("새로고침 후 다시 시도해주세요" + error);
        }
    }

    // DEL
    const deleteServers = async (id: number, name: string, imgUrls: Array<string>) => {
        if (window.confirm(`"${name}" 섬김이를 삭제하시겠습니까?`)) {
            if (serversData) {
                CommonDel("servers", `${serversData[arrIndex].title}`, id, setArrIndex);
                DeleteImages(imgUrls);
            }
        }
    };

    // 게시물 수정 버튼
    const editSchedule = (item: { id: number; name: string; imgUrls: Array<string>}) => {
        setEditingItem(item);
        setServersId(item.id);
        setServersName(item.name);
        setUrls(item.imgUrls)
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setServersId(0);
        setServersName("");
        setUrls([]);
    };
    
    // PUT
    const putServers = async () => {
        if (serversData) {
            setLoadingBoolen(true);
            const data = {id: serversId, name: serversName, imgUrls: urls}
            CommonPutImg(editingItem, "servers", `${serversData[arrIndex].title}`, data, serversImg)
            setLoadingBoolen(false);
            cancelEdit();
        }
    };
    
    return(
        <div>
            <ChildTitle>섬김이</ChildTitle>

            <FormBox onSubmit={postServers}>
                <InputGroupCustom>
                    <InputGroup.Text>순서</InputGroup.Text>
                    <Form.Control aria-label="Last name"
                        type="number"
                        name="id"
                        onChange={contentText}
                        value={serversId}
                        placeholder="예) 2023-01-01"
                    />
                </InputGroupCustom>
                <InputGroupCustom>
                    <InputGroup.Text>이름</InputGroup.Text>
                    <Form.Control 
                        type="text"
                        name="name"
                        value={serversName}
                        onChange={contentText}
                    />
                </InputGroupCustom>
                <InputGroupCustom className="mb-3">
                    <Form.Control 
                        type="file"
                        name="img"
                        onChange={contentText}
                    />
                </InputGroupCustom>
                <select value={DBPath} onChange={DropdownChange}>
                    {serversData && serversData.map((obj, i) => (
                        <option key={i} value={obj.title}>{obj.separationText}</option>
                    ))}
                </select>

                {editingItem ? (
                    <div>
                        <Button variant="outline-success" onClick={putServers}>
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
                {serversData && serversData.map((obj, i) => (
                    <NavItem
                        key={i}
                        onClick={() => arrIndexChange(i)}
                    >
                        {obj.separationText}
                    </NavItem>
                ))}
            </NavBox>

            <ListGroupStyled>
                {serversData && serversData[arrIndex].contentsArr.map((obj, i) => (
                    <ListGroupItem key={i}>
                        {obj.id} {obj.name}
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
                                onClick={() => deleteServers(obj.id, obj.name, obj.imgUrls)}
                            >
                                삭제
                            </Button>
                        </div>
                    </ListGroupItem>
                ))} 
            </ListGroupStyled>

            {loadingBoolen && <Loading />}
        </div>
    )
}

export default AdminServers;