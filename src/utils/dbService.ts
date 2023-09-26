import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

// 연간계획 DATA GET
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
            orderBy("date", "asc")
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


// 연혁 DATE GET
export interface HistoryDataPoops {
    date: number;
    contentsArr: Array<{content: string, date: string, id: number}>
}

export function HistoryData() {
    const [historydata, setHistoryData] = useState<HistoryDataPoops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "history"),
            orderBy("date", "asc")
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


// 설교영상 DATE GET
export interface YoutubeDataProps {
    id: number;
    title: string;
    date: string;
    bible: string;
    url: string;
}

export interface YoutubeDataArrayProps {
    date: number;
    contentsArr: Array<YoutubeDataProps>
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


// 섬김이 DATE GET
export interface PastorsDataPoops {
    separationText: string;
    detail: Array<{name: string, img: string, id: number}>
}

export function PastorsData() {
    const [pastorsData, setPastorsData] = useState<PastorsDataPoops[]>();

    useEffect(() => {
        const q = query(
            collection(dbService, "pastors"),
            orderBy("id", "asc")
        );
        
        onSnapshot(q, (snapshot) => {
            const pastorsArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPastorsData(pastorsArr);
        });
    }, []);

    return pastorsData;
}