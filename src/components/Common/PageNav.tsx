import { Link } from 'react-router-dom';
import { NavBox, Title } from './NavStyled';
import useHandleResize from '../../hooks/useHandleResize';

interface PageNavProps {
    title: string;
    LinkInfo: Array<{title: string, LinkUrl: string}>;
}

function PageNav({ title, LinkInfo }: PageNavProps) {
    const resize = useHandleResize();

    return(
        <NavBox>
            {resize > 768 && <Title>{title}</Title>}
            {LinkInfo.map((e, i) => (
                <Link key={i} to={e.LinkUrl}>
                    {e.title}
                </Link>
            ))}
        </NavBox>
    );
};

export default PageNav;