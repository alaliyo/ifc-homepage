import styled from "styled-components";
import { useLogInChack } from "../hooks/Chack";
import { AdminPageBox, ChildTitle } from "../style/CommonStyled";
import HomeProgressBar from "../components/Home/HomeProgressBar";
import ApplyRepair from "../components/Home/ApplyRepair";
import Intro from "../components/Home/Intro";

function Home() {
    useLogInChack();
    
    return(
        <AdminHomePageBox>
            <HomeChildTitle>저장소 사용량</HomeChildTitle>
            <HomeProgressBar />
            <Intro />
            <ApplyRepair />
        </AdminHomePageBox>
    )
}

export default Home;

const HomeChildTitle = styled(ChildTitle)`
    padding: 20px 0;
    margin-bottom: 10px;
`;

const AdminHomePageBox = styled(AdminPageBox)`
    width: 1024px;
    margin: 0 auto;
    display: block;
`;