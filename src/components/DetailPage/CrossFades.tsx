import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import img1 from '../../imgs/FadesImg1.png';
import img2 from '../../imgs/FadesImg2.png';
import img3 from '../../imgs/FadesImg3.png';

function CrossFades() {
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

export default CrossFades;

const StyledCarousel = styled(Carousel)`
    width: 100%;
    height: 300px;
    top: 0;
    left: 0;
    z-index: 0;
    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    a {
        width: 0;
        height: 0;
    }
    .carousel-indicators > button {
        width: 0;
        height: 0;
    }
    @media screen and (max-width: 650px) {
        width: 100%;
        height: 200px;
        img {
            width: 100%;
            height: 200px;
        }
    }
`;