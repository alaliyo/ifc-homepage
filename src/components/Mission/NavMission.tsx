import { useOutletContext } from 'react-router-dom';
import { NavBox, Title } from '../generally/NavStyled';
import LinkWrapperWithState from './LinkWrapperWithState';

interface NavigatorProps {
    windowWidth: number;
}

function Navigator() {
    const { windowWidth } = useOutletContext<NavigatorProps>();

    return (
        <NavBox>
            {windowWidth > 650 && <Title>유튜브</Title>}
            {/* 선교와 전도에 각각 LinkWrapperWithState 컴포넌트를 렌더링 */}
            <LinkWrapperWithState label="선교" to='/mission/overseas'>
                {/* LinkWrapperWithState 컴포넌트 내부에 들어갈 자식 요소입니다. */}
                <li>타이타이IFC</li>
                <li>교회</li>
                <li>교회</li>
            </LinkWrapperWithState>
            <LinkWrapperWithState label="전도" to='/mission/domestic'>
                <li>목요전도</li>
                <li>토요전도</li>
            </LinkWrapperWithState>
        </NavBox>
    );
}

export default Navigator;