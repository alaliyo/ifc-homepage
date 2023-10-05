import { collection, doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbService } from '../firebase';


// DB 용량 GET
export interface SizeData {
    name: string;
    count: number;
}

// Size GET
export function SizeGet(){
    const [dbSize, setDbSize] = useState<SizeData[]>();

    useEffect(() => {
        const q = query(collection(dbService, "volume"));

        onSnapshot(q, (snapshot) => {
            const ScheduleArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setDbSize(ScheduleArr);
        });
    }, []);

    return dbSize;
}

// Size +
export const SizePlus = async (plus: number, collectionName: string) => {
    try {
        const yearDocRef = doc(dbService, "volume", collectionName);
        const yearDocSnap = await getDoc(yearDocRef);

        if (yearDocSnap.exists()) {
            const yearData = yearDocSnap.data();
            await updateDoc(yearDocRef, {
                count: yearData,
            });
            
        }
    } catch (error) {
        console.error(error);
        return alert("새로고침 후 다시 시도해주세요.")
    }
}

// Size -
export function SizeMinus(size: number, minus: number, collectionName: string){
    const [dbSize, setDbSize] = useState<SizeData[]>();

    useEffect(() => {
        const q = query(collection(dbService, 'volume'));

        onSnapshot(q, (snapshot) => {
            const ScheduleArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setDbSize(ScheduleArr);
        });
    }, []);

    return dbSize;
}


// data 용량 KB 계산기
export function DbdataSize(data: any) {
    const jsonString = JSON.stringify(data);
    const byteCount = new TextEncoder().encode(jsonString).length;
    return Number((byteCount / 1024).toFixed(3));
}


// 사진 용량 KB 계산기
export function ImgsSize(images: Array<File>) {
    const [imgsSize, setImgsSize] = useState(0);

    for (const img of images) {
        setImgsSize(e => e + Number(img.size));
    }
    
    return Number((imgsSize / 1024).toFixed(3));
}