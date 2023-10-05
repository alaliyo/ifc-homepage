import { collection, doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbService, storage } from '../firebase';
import { deleteObject, getMetadata, ref } from 'firebase/storage';


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
    return Number((Math.ceil(byteCount / 1024 * 100) / 100).toFixed(2));
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

    return Number((Math.round(imgsSize / 1024 * 100) / 100).toFixed(2));
}


// storage 용량 산술
export const ImgsSizeArithmetic = async (image: any, arithmetic: string) => {
    try {
        const yearDocRef = doc(dbService, "volume", "storage");
        const yearDocSnap = await getDoc(yearDocRef);

        if (yearDocSnap.exists()) {
            const yearData = yearDocSnap.data();
            
            if (arithmetic === "+") {
                const fileSize = ImgsSize(image);
                
                await updateDoc(yearDocRef, {
                    count: yearData.count + fileSize,
                });
            } else if (arithmetic === "-") {
                const forestRef = ref(storage, image);
                getMetadata(forestRef)
                    .then(async (metadata) => {
                        const imgsSize = metadata.size;
                        const fileSize = Number((Math.round(imgsSize / 1024 * 100) / 100).toFixed(2))
                        
                        await updateDoc(yearDocRef, {
                            count: yearData.count + fileSize,
                        });
                        
                        await deleteObject(image);
                    })
                    .catch((error) => {
                        console.error(error);
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