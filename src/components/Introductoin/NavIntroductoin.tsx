import { Link, useOutletContext } from 'react-router-dom';
import { NavBox, Title } from '../Common/NavStyled';

interface WindowSize {
    windowWidth: number
}

function NavIntroductoin() {
    const { windowWidth } = useOutletContext<WindowSize>();

    return(
        <NavBox>
            {windowWidth > 650 && <Title>교회소개</Title>}
            <Link to={'vision'}>
                교회
                {windowWidth > 650 && <br />}
                비전
            </Link>
            <Link to={'history'}>
                교회
                {windowWidth > 650 && <br />}
                연혁
            </Link>
            <Link to={'rev'}>
                담임
                {windowWidth > 650 && <br />}
                목사
            </Link>
            <Link to={'pastors'}>
                교역자
            </Link>
            <Link to={'elder'}>
                장로
            </Link>
            <Link to={'sketch-map'}>
                교회
                {windowWidth > 650 && <br />}
                약도
            </Link>
        </NavBox>
    );
};

export default NavIntroductoin;
