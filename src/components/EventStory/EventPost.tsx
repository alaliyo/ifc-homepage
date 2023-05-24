import { Link } from "react-router-dom";
import styled from "styled-components";

function EventPost() {
    return(
        <div>
            <PostsHeader>
                <Title>게시물</Title>
            </PostsHeader>
            <PostHeader>
                <LinkStyle to={'/'}>
                    <PostInfo>
                        <div>0</div>
                        <div>제목</div>
                    </PostInfo>
                    <div>23.05.25</div>
                </LinkStyle>
            </PostHeader>
        </div>
    );
}

export default EventPost;

const PostsHeader = styled.header`
    display: flex;
    justify-content: space-between; 
`;

const Title = styled.p`
    width: 100px;
    font-size: 30px;
    font-weight: 900;
    @media screen and (max-width: 650px) {
        font-size: 20px;
    }
`;

const PostHeader = styled.div`
    border-top: 2px solid gray;
`;

const LinkStyle = styled(Link)`
    color: black;
    font-size: 18px;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        color: white;
        background-color: gray;
        transition: .3s;
    }
`;

const PostInfo = styled.div`
    display: flex;
    div {
        margin-left: 5px;
    }
`;