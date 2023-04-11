import { useEffect } from 'react';
import styled from 'styled-components';

declare global { //타입 선언
  interface Window {
    kakao: any;
  }
}

const { kakao } = window; //window 객체에서 kakao라는 속성을 추출

function SketchMap() {
  useEffect(() => {
    const mapPosition = new kakao.maps.LatLng(35.41155, 129.1747); //좌표
  
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: mapPosition, //지도의 중심좌표.
        level: 2, //지도의 레벨(확대, 축소 정도)
        draggable: false, //이동 제한
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const marker = new kakao.maps.Marker({ //지도 마크 생성
      map: map,
      position: mapPosition,
    });

    const zoomControl = new kakao.maps.ZoomControl(); //확대 축소 컨트롤
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT); // 제어 UI의 위치 설정

    const customOverlay = new kakao.maps.CustomOverlay({ // 커스텀 오버레이 생성
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

    const handleMarkerClick = () => { //클릭 시 page url 반환
      window.open(`https://map.kakao.com/link/search/경남 양산시 삼호동부6길 18`);
    };

    // 마커 클릭 시 이벤트 처리
    kakao.maps.event.addListener(marker, 'click', handleMarkerClick);

    // 클린업 함수를 활용하여 이벤트 리스너 제거
    return () => {
      kakao.maps.event.removeListener(marker, 'click', handleMarkerClick);
    };

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
  @media screen and (max-width: 650px) {
    margin: 15px 0;
    width: 100%;
    font-size: 17px;
    text-align: center;
  }
`;

const Map = styled.div`
  width: 80%;
  height: 400px;
  margin: 10px auto;
  border: 2px solid gray;
  border-radius: 15px;
  @media screen and (max-width: 650px) {
    margin: 0 0;
    width: 100%;
    height: 250px;
  }
`;

const TextBox = styled.div`
  margin-top: 20px;
  margin: 10px 0;
  div {
    margin: 5px 0;
    font-size: 18px;
    font-weight: 900;
    text-align: center;
    @media screen and (max-width: 650px) {
      font-size: 13px;
    }
  }
`;