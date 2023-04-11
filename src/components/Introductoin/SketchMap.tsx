import { useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function SketchMap() {
  useEffect(() => {
    const mapPosition = new kakao.maps.LatLng(35.41155, 129.1747);
  
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: mapPosition, //지도의 중심좌표.
        level: 2, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const marker = new kakao.maps.Marker({ //지도 마크 생성
      map: map,
      position: mapPosition,
    });

    const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT); // 제어 UI의 위치 설정

      // 커스텀 오버레이 생성
    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      content: `
      <div style="position:relative;">
        <div style="background-color:white; padding:5px; border-radius:5px; text-align:center; font-size:20px; font-weight: 900; border: 2px solid gray; border-radius: 10px;">열방교회</div>
        <div 
          style="position:absolute; left:50%; bottom:-10px; transform:translateX(-50%); width:0;
          height:0; border-left:5px solid transparent; border-right:5px solid transparent; border-top:10px solid gray;"
        >
        </div>
      </div>
    `, // 오버레이에 표시할 내용 (HTML 형식)
      position: mapPosition, // 오버레이의 위치
      xAnchor: 0.5, // 오버레이의 가로 위치 설정
      yAnchor: 2.5, // 오버레이의 세로 위치 설정
    });

    // 마커 클릭 시 이벤트 처리
    kakao.maps.event.addListener(marker, 'click', () => {
      // 카카오 맵으로 길찾기 팝업 띄우기
      window.open(`https://map.kakao.com/link/search/경남 양산시 삼호동부6길 18`);
    });

  }, []);
  
  return (
      <SketchMapBox>
        <Title>찾아오는 길</Title>
        <Map id="map"></Map>
        <TextBox>
          <div>주   소: 경남 양산시 삼호동부6길 18 (2층)</div>
          <div>전화번호: 055-365-1080 / 010-4314-6007</div>
          <div>(마크를 누르면 길 찾기도 가능합니다.)</div>
        </TextBox>
      </SketchMapBox>
    );
  }

export default SketchMap;

const SketchMapBox = styled.div`
`

const Title = styled.h3`
  margin: 20px 0;
  margin-left: 30px;
  font-weight: 900;
`;

const Map = styled.div`
  width: 80%;
  height: 400px;
  margin: 10px auto;
  border: 2px solid gray;
  border-radius: 15px;
`;

const TextBox = styled.div`
  margin-top: 20px;
  margin: 10px 0;
  div {
    margin: 5px 0;
    font-size: 18px;
    font-weight: 900;
    text-align: center;
  }
`;