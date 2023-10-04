import { Outlet } from "react-router-dom";
import { ChildBox, OutletBox, PageBody } from './PageStyled';
import PageNav from "../components/Common/PageNav";

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
            <ChildBox>
                <PageNav
                    title="기관 및 학교"
                    LinkInfo={linkInfoArr}
                />
                    <OutletBox> 
                        <Outlet/>
                    </OutletBox>
            </ChildBox>
        </PageBody>
    );
}

export default Ministry;