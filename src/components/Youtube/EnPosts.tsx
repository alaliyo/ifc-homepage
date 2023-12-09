import { useEffect, useState } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import { PostsBox, PostsBody, ListContentBox, Thumbnail, ContentBox} from './YoutubeStyled';
import Pagination from "../Common/Pagination";
import { ChildTitle, NavBox, NavItem } from "../Common/CommonStyled";
import { DateProps, VideoProps } from "./YoutubeProps";
import CommonSpinner from "../Common/CommonSpinner";

function EnPosts() {
    const { enVideos, arrIndex } = useOutletContext<DateProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [yearArr, setYearArr] = useState<string[]>([]);
    const [year, setYear] = useState("")
    const [yearVideo, setYearVideo] = useState<VideoProps[]>();
    
    // 페이징 DATA
    const getPostsForCurrentPage = () => {
        if (yearVideo && yearVideo.length > 0) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            return yearVideo.slice(startIndex, endIndex);
        }
        return [];
    };
    
    const arrIndexChange = (text: string) => {
        setYear(text);
    };
    
    // 날짜 자동 분별
    useEffect(() => {
        const arr: string[] = [];

        if (arr.length > 0) arr.push(enVideos[0].title.slice(-12, -8));

        for (const obj of enVideos) {
            const objYear = obj.title.slice(-12, -8);
            if (arr[arr.length - 1] !== objYear) arr.push(objYear);
        }
        setYear(arr[0])
        setYearArr(arr)
    }, [enVideos]);

    // 날짜에 맞게 영상 보임
    useEffect(() => {
        const arr: VideoProps[] = [];
        if (year) {
            for (const obj of enVideos) {
                if (obj.title.includes(year)) arr.push(obj);
            }
        }
        setYearVideo(arr)
    }, [enVideos, year]);
    
    return(
        <PostsBox>
            <ChildTitle>English</ChildTitle>
            <NavBox>
                {yearArr && yearArr.map((year, i) => (
                    <NavItem key={i} onClick={() => arrIndexChange(year)}>{year}</NavItem>
                ))}
            </NavBox>
            {yearVideo && yearVideo.length > 0 ? (<>
                <PostsBody>
                    {yearVideo && yearVideo.length > 0 && getPostsForCurrentPage().map((obj, i) => (
                        <Link key={i} to={`/youtube/detail/en/${obj.id}`}>
                        <ListContentBox>
                            <Thumbnail src={obj.img} alt="" />
                            <ContentBox>
                                <p>{obj.content.split("\n")[0]}</p>
                                <p>{obj.content.split("\n")[2]}</p>
                                <p>{obj.title.slice(-12, -1)}</p>
                            </ContentBox>
                        </ListContentBox>
                    </Link>
                    ))}
                </PostsBody>

                <Pagination 
                    data={yearVideo}
                    arrIndex={arrIndex}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    postsPerPage={postsPerPage}
                />
            </>) : <CommonSpinner />}
        </PostsBox>
    );
}

export default EnPosts;