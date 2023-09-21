import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { ref, listAll, getDownloadURL  } from "firebase/storage";
import { storage } from "../../firebase";

function CrossFade() {
    const [imgList, setImgList] = useState<string[]>([]);

    useEffect(() => {   
        // 로컬스토리지에서 이미지 URL 가져오기
        const storedImgList = localStorage.getItem('homeImgList');
        if (storedImgList) {
            setImgList(JSON.parse(storedImgList));
        } else {
            const storageRef = ref(storage, "homeImg"); // 이미지 경로
            
            listAll(storageRef)
                .then(async (result) => {
                    const urls: string[] = [];
                    for (let i = 0; i < result.items.length; i++) {
                        const item = result.items[i];
                        const url = await getDownloadURL(item); // 파일의 다운로드 URL 가져오기
                        urls.push(url); // 배열에 URL 추가
                    }
                    setImgList(urls); // 상태 업데이트
                    // 이미지 URL을 로컬스토리지에 저장
                    localStorage.setItem('homeImgList', JSON.stringify(urls));
                })
                .catch((error) => {
                    console.error("사진 가져오기 실패:", error);
                });
        }
    }, []);

    return(
        <StyledCarousel fade>
            {imgList.map((e, i) => (
                <Carousel.Item key={i} interval={5000}>
                <img
                    className="d-block w-100"
                    src={e}
                    alt=""
                />
            </Carousel.Item>
            ))}
        </StyledCarousel>
    );
}

export default CrossFade;

const StyledCarousel = styled(Carousel)`
    width: 100%; /* 웹 창 가로폭에 맞게 조정됩니다. */
    height: 600px; /* 이미지 비율이 유지됩니다. */
    top: 0;
    left: 0;
    z-index: 0;

    img {
        width: 1600px;
        height: 600px;
        object-fit: cover;
    }

    @media screen and (max-width: 768px) {
        width: 100%; /* 웹 창 가로폭에 맞게 조정됩니다. */
        height: auto; /* 이미지 비율이 유지됩니다. */
        
        img {
            width: 100%;
            height: 250px;
        }
    }
`;