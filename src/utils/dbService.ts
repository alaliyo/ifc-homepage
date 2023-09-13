import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

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
