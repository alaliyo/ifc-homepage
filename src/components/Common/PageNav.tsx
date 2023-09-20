import { Link, useOutletContext } from 'react-router-dom';
import { NavBox, Title } from './NavStyled';

interface WindowSize {
    windowWidth: number
}

interface LinkInfoProps {
    title1: string;
    title2?: string;
    LinkUrl: string;
}

interface PageNavProps {
    title: string;
    LinkInfo: LinkInfoProps[];
}

function PageNav({ title, LinkInfo }: PageNavProps) {
    const { windowWidth } = useOutletContext<WindowSize>();

    return(
        <NavBox>
            {windowWidth > 650 && <Title>{title}</Title>}
            {LinkInfo.map((e, i) => (
                <Link key={i} to={e.LinkUrl}>
                    {e.title1}
                    {windowWidth > 650 && <br />}
                    {e.title2 && e.title2}
                </Link>
            ))}
        </NavBox>
    );
};

export default PageNav;
