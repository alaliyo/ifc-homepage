import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NotFound() {
    return(
        <NotFoundBody>
            <h1>404 오류입니다. url을 확인해주세</h1>
            <Link to='/'>홈으로 가고 싶다면 클릭</Link>
        </NotFoundBody>
    );
}

export default NotFound;

const NotFoundBody = styled.div`
    margin-top: 200px;
    text-align: center;
`;