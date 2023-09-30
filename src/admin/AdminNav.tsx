import { Link } from "react-router-dom";
import styled from "styled-components";

interface NavProps {
    LinkInfo: Array<{LinkUrl: string, title: string}>
}

function AdminNav({ LinkInfo }: NavProps) {
    return(
        <NavBox>
            {LinkInfo.map((e, i) => (
                <Link key={i} to={e.LinkUrl}>
                    {e.title}
                </Link>
            ))}
        </NavBox>
    )
}

export default AdminNav;

const NavBox = styled.nav`
    background-color: #555555;
    width: 150px;
    text-align: center;
    height: 100vh;

    a {
        color: white;
        font-size: 18px;
        padding-bottom: 20px;
        display: block;
        text-decoration: none;

        :hover {
            transition: 0.2s ease-in-out;
            transform: scale(1.1);
        }
    }
`;