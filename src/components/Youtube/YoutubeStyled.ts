import { Link } from "react-router-dom";
import styled from "styled-components";
import { fadeInAnimation } from "../Common/CommonStyled";

export const PostsBox = styled.div`
    width: 80%;
    padding: 20px;
    animation: ${fadeInAnimation} 0.3s ease-in;
    
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 5px;
    }
`;

export const Writin = styled(Link)`
    color: black;
    font-weight: 900;
    text-decoration: none;
`;

export const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between; 
`;

export const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;

    @media screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

export const PostsBody = styled.div`
    a {
        display: block;
        text-decoration: none;
        font-weight: 900;
        color: black;
        padding: 10px;
        border-bottom: 1px solid #adadad;
        word-break: keep-all;

        @media screen and (max-width: 480px) {
            font-size: 13px;
            padding: 10px 0;
        }

        :Hover {
            background-color: #adadad;
            color: white;
            transition: .3s;
            border-radius: 5px;
        }
    }
    
    @media screen and (max-width: 768px) {
        border-top: none;
    }
`;

export const Thumbnail = styled.img`
    height: 100px;
    aspect-ratio: 16 / 9;
`;

export const ListContentBox = styled.div`
    display: flex;

`;

export const ContentBox = styled.div`
    margin-left: 10px;

    p {
        margin-bottom: 5px;
    }
`;