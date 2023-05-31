import { Link } from "react-router-dom";
import styled from "styled-components";

function EventPostDetail() {

    return(
        <EventPostDetailBox>
            <Detail>
                <PostTitle>title</PostTitle>
                <Link to='/event-story/post'>←목록으로</Link>
            </Detail>
        </EventPostDetailBox>
    );
}

export default EventPostDetail;

const EventPostDetailBox = styled.div`
    
`;

const PostTitle = styled.p`
    font-size: 20px;
    font-weight: 900;
`;

const Detail = styled.header`
    display: flex;
    justify-content: space-between;
    a {
        color: #3636368d;
        font-weight: 900;
        text-decoration: none;
    }
`