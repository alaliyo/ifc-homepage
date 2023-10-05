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


// data 용량 KB 계산기
export function DbdataSize(data: any) {
    const jsonString = JSON.stringify(data);
    const byteCount = new TextEncoder().encode(jsonString).length;
    return Number((byteCount / 1024).toFixed(3));
}


// DB 용량 산술
export const DbdataSizeArithmetic = async (data: any, arithmetic: string) => {
    try {
        const yearDocRef = doc(dbService, "volume", "database");
        const yearDocSnap = await getDoc(yearDocRef);

        if (yearDocSnap.exists()) {
            const yearData = yearDocSnap.data();
            const num = DbdataSize(data);
            
            if (arithmetic === "+") {
                await updateDoc(yearDocRef, {
                    count: yearData.count + num,
                });
            } else if (arithmetic === "-") {
                await updateDoc(yearDocRef, {
                    count: yearData.count - num,
                });
            } else {
                alert("새로고침 후 다시 시도해주세요.")
            }
        }
    } catch (error) {
        console.error(error);
        return alert("새로고침 후 다시 시도해주세요.")
    }
}


// 사진 용량 KB 계산기
export function ImgsSize(images: Array<File>) {
    const [imgsSize, setImgsSize] = useState(0);

    for (const img of images) {
        setImgsSize(e => e + Number(img.size));
    }
    
    return Number((imgsSize / 1024).toFixed(3));
}


// storage 용량 산술
export const ImgsSizeArithmetic = async (images: any, arithmetic: string) => {
    try {
        const yearDocRef = doc(dbService, "volume", "storage");
        const yearDocSnap = await getDoc(yearDocRef);

        if (yearDocSnap.exists()) {
            const yearData = yearDocSnap.data();
            const num = ImgsSize(images);
            
            if (arithmetic === "+") {
                await updateDoc(yearDocRef, {
                    count: yearData.count + num,
                });
            } else if (arithmetic === "-") {
                await updateDoc(yearDocRef, {
                    count: yearData.count - num,
                });
            } else {
                alert("새로고침 후 다시 시도해주세요.")
            }
        }
    } catch (error) {
        console.error(error);
        return alert("새로고침 후 다시 시도해주세요.")
    }
}