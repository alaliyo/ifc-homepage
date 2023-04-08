import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import img1 from '../../imgs/homeImg1.png';
import img2 from '../../imgs/homeImg2.png';
import img3 from '../../imgs/homeImg3.png';

function CrossFade() {
    return(
        <StyledCarousel fade>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img1}
                alt=""
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img2}
                alt=""
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img3}
                alt=""
                />
            </Carousel.Item>
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
    @media screen and (max-width: 650px) {
        width: 100%; /* 웹 창 가로폭에 맞게 조정됩니다. */
        height: auto; /* 이미지 비율이 유지됩니다. */
        img {
            width: 100%;
            height: auto;
        }
    }
`;