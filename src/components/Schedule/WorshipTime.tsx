import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Body } from '../Common/CommonStyled';

function WorshipTime() {
    return(
        <Body>
            <TitleBox>
                <h3>예배 시간 안내</h3>
                <h5>WORSHIP SCHEDULE</h5>
            </TitleBox>
            <TableStyled bordered>
                <tbody>
                    <tr>
                        <td rowSpan={4}>주일예배<br />(일요일)</td>
                        <td>주일학교</td>
                        <td>오전</td>
                        <td>9:00</td>
                    </tr>
                    <tr>
                        <td>오전예배</td>
                        <td>오전</td>
                        <td>11:00</td>
                    </tr>
                    <tr>
                        <td>오후예배</td>
                        <td>오후</td>
                        <td>2:30</td>
                    </tr>
                    <tr>
                        <td>영어예배</td>
                        <td>오후</td>
                        <td>5:00</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>새벽기도회<ChargeExplanation>(월~금)</ChargeExplanation></td>
                        <td>오전</td>
                        <td>5:30</td>
                    </tr>
                    <tr>
                        <td>수요예배</td>
                        <td>오전 11:00</td>
                        <td>오후 1:30</td>
                        <td>밤 7:30</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>금요철야기도회</td>
                        <td>밤</td>
                        <td>8:00</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>IFC 성경대학<ChargeExplanation>(매월 마지막 화요일)</ChargeExplanation></td>
                        <td>오전</td>
                        <td>10:30</td>
                    </tr>
                </tbody>
            </TableStyled>
            <TableStyled bordered>
                <tbody>
                    <tr>
                        <td rowSpan={2}>SUNDAY <br /> SERVICE</td>
                        <td>SUNDAY SCHOOL</td>
                        <td>AM</td>
                        <td>9:00</td>
                    </tr>
                    <tr>
                        <td>ENGLISH WORSHIP</td>
                        <td>PM</td>
                        <td>5:00</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>WEDNESDAY <br /> SERVICE</td>
                        <td>MULTICULTURAL FAMILY</td>
                        <td>PM</td>
                        <td>1:30</td>
                    </tr>
                    <tr>
                        <td>EVENING SERVICE</td>
                        <td>PM</td>
                        <td>8:00</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>FRIDAY RPAYER MEETING</td>
                        <td>PM</td>
                        <td>10:30</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>SATURDAY</td>
                        <td>PRAISE TEAM MINISTRY <ChargeExplanation>(Every 2nd Sat.)</ChargeExplanation></td>
                        <td>PM</td>
                        <td>7:00</td>
                    </tr>
                    <tr>
                        <td>BIBLE STUDY <ChargeExplanation>(Every 3rd & 4th Sat.)</ChargeExplanation></td>
                        <td>PM</td>
                        <td>7:00</td>
                    </tr>
                </tbody>
            </TableStyled>
        </Body>
    );
}

export default WorshipTime;

const TitleBox = styled.div`
    text-align: center;
    margin: 20px 0;

    h3 {
        font-weight: 900;

        @media screen and (max-width: 480px) {
            font-size: 20px;
        }
    }

    h5 {
        font-weight: 900;

        @media screen and (max-width: 480px) {
            font-size: 17px;
        }
    }
`;

const TableStyled = styled(Table)`
    td {
        font-weight: 900;
        vertical-align: middle;

        @media screen and (max-width: 768px) {
            font-size: 15px;
        }

        @media screen and (max-width: 480px) {
            font-size: 12px;
        }
    }
`

const ChargeExplanation = styled.span`
    font-size: 11px;

    @media screen and (max-width: 768px) {
        font-size: 10px;
    }
`;