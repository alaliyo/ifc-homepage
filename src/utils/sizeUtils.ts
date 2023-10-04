import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbService } from '../firebase';


// DB 용량 GET
export interface SizeData {
    name: string;
    count: number;
}

export function SizeGet(): SizeData[] | null {
    const [dbSize, setDbSize] = useState<SizeData>();
    const [storageSize, getStorageSize] = useState<SizeData>();

    useEffect(() => {
        const q = query(collection(dbService, 'volume'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setDbSize(snapshot.docs[0].data() as SizeData);
            getStorageSize(snapshot.docs[1].data() as SizeData)
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return dbSize && storageSize ? [dbSize, storageSize] : null;
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