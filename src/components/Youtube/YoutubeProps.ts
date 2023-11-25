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
}

export interface VideoProps {
    id: string;
    title: string;
    img: string;
    content: string;
}

export interface DateProps {
    krVideos: VideoProps[];
    enVideos: VideoProps[];
    arrIndex: number;
    setArrIndex: any;
};