import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

// 연간계획 DATA GET
export interface ScheduleDataPoops {
    id: string;
    title: string;
    date: string;
    url: string;
}

export function ScheduleData() {
    const [scheduleDatas, setScheduleDatas] = useState<ScheduleDataPoops[]>([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "schedules"),
            orderBy("date", "asc")
        );
        
        onSnapshot(q, (snapshot) => {
            const ScheduleArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setScheduleDatas(ScheduleArr);
        });
    }, []);

    return scheduleDatas;
}

export interface YearScheduleDataPoops {
    date: number;
    contentsArr: Array<{content: string, date: string, id: number}>
}

export function YearScheduleData() {
    const [YearsCheduleDatas, setYearScheduleDatas] = useState<ScheduleDataPoops[]>([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "schedules"),
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