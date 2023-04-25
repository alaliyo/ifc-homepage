import { Link, useOutletContext } from 'react-router-dom';
import { NavBox, Title } from '../generally/NavStyled';

interface NavigatorProps { // props 타입
    windowWidth: number
}

function Navigator() {
    const { windowWidth } = useOutletContext<NavigatorProps>();

    return(
        <NavBox>
            {windowWidth > 650 && <Title>유튜브</Title>}
            <Link to={'posts'}>
                2023
            </Link>
        </NavBox>
    );
};

export default Navigator;