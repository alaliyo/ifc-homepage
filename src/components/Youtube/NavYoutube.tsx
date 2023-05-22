import { Link, useOutletContext } from 'react-router-dom';
import { NavBox, Title } from '../Common/NavStyled';

interface NavigatorProps { // props 타입
    windowWidth: number
}

function Navigator() {
    const { windowWidth } = useOutletContext<NavigatorProps>();

    return(
        <NavBox>
            {windowWidth > 650 && <Title>유튜브</Title>}
            <Link to={'kr-posts'}>
                한국
            </Link>
            <Link to={'en-posts'}>
                영어
            </Link>
        </NavBox>
    );
};

export default Navigator;