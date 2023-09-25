import { YoutubeDataArrayProps } from "../../utils/dbService";

export interface DataProps {
    postId: number;
    title: string;
    url: string;
    date: string;
    bibleVerse:string;
}

export interface ArrayProps {
    krData: Array<DataProps>
    enData: Array<DataProps>;
    postsData: Array<DataProps>;
}

export interface YoutubeProps {
    windowWidth: number;
    loggedIn: boolean;
}

export interface DateProps {
    getData: YoutubeDataArrayProps[];
    arrIndex: number;
    setArrIndex: any;
};