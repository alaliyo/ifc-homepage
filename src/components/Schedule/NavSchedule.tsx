import { Link, useOutletContext } from 'react-router-dom';
import { NavBox, Title } from '../generally/NavStyled';

interface WindowSize {
    windowWidth: number
}

function NavIntroductoin() {
    const { windowWidth } = useOutletContext<WindowSize>();

    return(
        <NavBox>
            {windowWidth > 650 && <Title>일정</Title>}
            <Link to={'worship-time'}>
                예배
                {windowWidth > 650 && <br />}
                시간
            </Link>
            <Link to={'year'}>
                연중
                {windowWidth > 650 && <br />}
                계획
            </Link>
        </NavBox>
    );
};

export default NavIntroductoin;
