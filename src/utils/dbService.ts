import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import { DeleteImages, uploadImage } from "./storageService";

// 연간계획 GET
export interface ScheduleDataprops {
    title: string;
    date: string;
    id: number;
    content: string;
}

export interface YearScheduleDataprops {
    date: number;
    contentsArr: Array<ScheduleDataprops>
}

export function YearScheduleData() {
    const [YearsCheduleDatas, setYearScheduleDatas] = useState<YearScheduleDataprops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "year-schedules"),
            orderBy("date", "desc")
        );
        
        onSnapshot(q, (snapshot) => {
            const ScheduleArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setYearScheduleDatas(ScheduleArr);
        });
    }, []);

    return YearsCheduleDatas;
}


// 연혁 GET
export interface HistoryDataPoops {
    date: number;
    contentsArr: Array<{content: string, date: string, id: number}>
}

export function HistoryData() {
    const [historydata, setHistoryData] = useState<HistoryDataPoops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "history"),
            orderBy("date", "desc")
        );
        
        onSnapshot(q, (snapshot) => {
            const historyArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHistoryData(historyArr);
        });
    }, []);

    return historydata;
}


// 설교영상 GET
export interface YoutubeDataProps {
    id: number;
    title: string;
    date: string;
    bible: string;
    url: string;
}

export interface YoutubeDataArrayProps {
    date: number;
    contentsArr: Array<YoutubeDataProps>;
}

export async function YoutubeData(collectionPath: string): Promise<YoutubeDataArrayProps[]> {
    try {
        const q = query(collection(dbService, collectionPath), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const pastorsData: YoutubeDataArrayProps[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as unknown as YoutubeDataArrayProps[];
        return pastorsData;
    } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        throw error; // 오류를 호출한 곳으로 전파합니다.
    }
}


// 주보 GET
export interface WeeklyDataPoops {
    date: string;
    id: number;
    imgUrls: Array<string>;
}

export interface WeeklyDataArrayPoops {
    date: number;
    contentsArr: Array<WeeklyDataPoops>
}

export function WeeklyData() {
    const [weeklyData, setWeeklyData] = useState<WeeklyDataArrayPoops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "weekly"),
            orderBy("date", "desc")
        );
        
        onSnapshot(q, (snapshot) => {
            const historyArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWeeklyData(historyArr);
        });
    }, []);

    return weeklyData;
}


// 섬김이 GET
export interface ServersDataPoops {
    name: string;
    imgUrls: Array<string>;
    id: number;
}

export interface ServersDataArrayPoops {
    id: number
    title: string;
    separationText: string;
    contentsArr: Array<ServersDataPoops>
}

export function ServersData() {
    const [serversData, setServersData] = useState<ServersDataArrayPoops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "servers"),
            orderBy("id", "asc")
        );
        
        onSnapshot(q, (snapshot) => {
            const pastorsArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServersData(pastorsArr);
        });
    }, []);

    return serversData;
}

// 게시물 GET
export interface EventStoryDataProps {
    id: number;
    title: string;
    date: string;
    content?: string;
    imgUrls: Array<string>;
}

export interface EventStoryDataArrayProps {
    date: number;
    contentsArr: Array<EventStoryDataProps>
}

export function EventStoryData() {
    const [eventStoryData, setEventStoryData] = useState<EventStoryDataArrayProps[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "event-story"),
            orderBy("date", "desc")
        );
        
        onSnapshot(q, (snapshot) => {
            const historyArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEventStoryData(historyArr);
        });
    }, []);

    return eventStoryData;
}


// 인증 GET
export interface CertificationPoops {
    id: string;
    password: string;
}

export function CertificationData() {
    const [certificationData, setCertificationData] = useState<CertificationPoops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "certification"),
        );
        
        onSnapshot(q, (snapshot) => {
            const pastorsArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCertificationData(pastorsArr);
        });
    }, []);

    return certificationData;
}

// Common POST
export const CommonPost = async (
    data: any,
    collectionName: string,
    year: number
) => {
    try {
        const nowDate = Date.now();
        const decadDocRef = doc(dbService, collectionName, `${year}`);
        const deacadDocSnap = await getDoc(decadDocRef);

        if (data) data.id = nowDate;

        if (deacadDocSnap.exists()) {
            // 데이터가 이미 존재하는 경우 배열에 내용 추가
            const yearData = deacadDocSnap.data();
            yearData.contentsArr.push(data);

            // 기존 데이터 업데이트
            await updateDoc(decadDocRef, {
                contentsArr: yearData.contentsArr,
            });
        } else {
            // 데이터가 없는 경우 새로운 데이터 생성
            await setDoc(decadDocRef, {
            date: year,
            contentsArr: [
                data
            ]
            });
        }

        alert("작성이 완료되었습니다.");
    } catch (error) {
        return alert("새로고침 후 다시 시도해주세요" + error);
    }
};


// Common DELETE
export const CommonDel = async (
    documentName: string,
    collectionName: string,
    id: number,
    setArrIndex: any,
) => {
    try {
        const yearDocRef = doc(dbService, documentName, collectionName);
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
            alert("삭제가 되었습니다.");
        }
    } catch (error) {
        return alert("새로고침 후 다시 시도해주세요" + error);
    }
};


// Common PUT 이미지 없음
export const CommonPut = async (
    editingItem: any,
    documentName: string,
    collectionName: string,
    data: any,
) => {
    if (!editingItem) return;

    try {
        const yearDocRef = doc(dbService, documentName, collectionName);
        const yearDocSnap = await getDoc(yearDocRef);
        if (yearDocSnap.exists()) {
            const yearData = yearDocSnap.data();
            const updatedContents = yearData.contentsArr.map((item: any) => {
                if (item.id === editingItem.id) {
                    return {
                        ...item,
                        ...data
                    };
                }
                return item;
            });

            await updateDoc(yearDocRef, {
                contentsArr: updatedContents,
            });

            alert("수정이 완료되었습니다.");
        }
    } catch (error) {
        return alert("새로고침 후 다시 시도해주세요" + error);
    }
};


// Common PUT 이미지 있음
export const CommonPutImg = async (
    editingItem: any,
    documentName: string,
    collectionName: string,
    data: any,
    imgs: Array<File>,
) => {
    if (!editingItem) return;
    
    try {
        const yearDocRef = doc(dbService, documentName, collectionName);
        const yearDocSnap = await getDoc(yearDocRef);
        if (yearDocSnap.exists()) {
            const yearData = yearDocSnap.data();
            const updatedContents = yearData.contentsArr.map(async (item: any) => {
                if (item.id === editingItem.id) {
                    if (imgs.length > 0) {
                        DeleteImages(editingItem.imgUrls);
                        const imageUrls = await uploadImage(documentName, data.name, imgs);
                        return {
                            ...item,
                            ...data,
                            imgUrls: imageUrls,
                        };
                    } else {
                        return {
                            ...item,
                            ...data,
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
        }
    } catch (error) {
        return alert("새로고침 후 다시 시도해주세요" + error);
    }
};