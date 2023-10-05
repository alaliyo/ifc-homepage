import { Outlet } from "react-router-dom";
import { ChildBox, OutletBox, PageBody } from './PageStyled';
import PageNav from "../components/Common/PageNav";
import styled from "styled-components";

function Ministry() {
    const linkInfoArr = [
        {title: '실로암', LinkUrl: 'senior'},
        {title: '남선교회', LinkUrl: 'men'},
        {title: '여선교회', LinkUrl: 'women'},
        {title: '다문화', LinkUrl: 'multicultural'},
        {title: '유스그룹', LinkUrl: 'youth'},
        {title: '주일학교', LinkUrl: 'children'},
    ]
    return(
        <PageBody>
            <Box>
                <h2>내년에 제작 완료됩니다.</h2>
                <h2>기대해 주세요~~</h2>
            </Box>
            {/* 
            <ChildBox>
                <PageNav
                    title="기관 및 학교"
                    LinkInfo={linkInfoArr}
                />
                    <OutletBox> 
                        <Outlet/>
                    </OutletBox>
            </ChildBox>
            */}
        </PageBody>
    );
}

export default Ministry;

const Box = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;