import styled from "styled-components";
import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox } from "../style/CommonStyled";


function Home() {
    useLogInChack();

    return(
        <AdminHomePageBox>
            <h1>홈</h1>
        </AdminHomePageBox>
    )
}

export default Home;

const AdminHomePageBox = styled(AdminPageBox)`
    width: 1024px;
    margin: 0 auto;
`;