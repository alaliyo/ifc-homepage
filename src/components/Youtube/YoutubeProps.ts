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