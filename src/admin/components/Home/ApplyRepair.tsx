import { HomeChildBox } from "./HomeChildStyled";

function ApplyRepair() {
    return(
        <HomeChildBox>
            <h3>유지보수 신청</h3>
            <p>
                링크 클릭 후 InCh 홈페이지로 이동하셔서 글 작성하시면 신속히 연락드립니다.
                <br />
                작업량으로 가격이 측정되며 유지보수2~4는 회수가 차감됩니다. 
            </p>
            <a href="https://set-up-church-website.firebaseapp.com/inquiry/repair" target="_blank">신청하러가기 </a>
        </HomeChildBox>
    );
}

export default ApplyRepair;