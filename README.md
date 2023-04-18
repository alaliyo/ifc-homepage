<h1>⛪IFC 홈페이지 제작</h1>

<br/>

<h2>🖼 프로젝트 소개</h2>
<div>
  <span>&emsp;교회 홈페이지 입니다~~ 교회 소개(비전, 방향, 근무자, 약도), 스케줄(예배 시간, 연계획), youtube 예배영상, 해외 사역을 기록하고 있는 홈페이지 입니다.</span><br/>
  <span>&emsp;열방 교회를 알고 싶은 분들에게 온라인으로 간단하게 알 수 있게 해주는 홈페이지입니다.</span>
</div>


<br/>


<h2>💻개방 언어 및 활용 기술</h2>
<h3>언어 및 프레임워크</h3>
<ul>
  <li>HTML, CSS, JS</li>
  <li>TS, TSX</li>
  <li>React</li>
</ul>
<h3>라이브러리</h3>
<ul>
  <li>Styled-Components</li>
  <li>React-Router-dom v6</li>
  <li>React-Bootstrap</li>
  <li>fullcalendar</li>
</ul>
<h3>DB 및 서버(Firebase)</h3>
<ul>
  <li>Hosting</li>
  <li>Storage</li>
  <li>Authentication</li>
  <li>Firestore Database</li>
</ul>
<h3>Open API</h3>
<ul>
  <li>Kakao Map</li>
</ul>


<br/>


<h2>🎨아키텍처</h2>
<a 
  href='https://lucid.app/lucidspark/d237b803-7886-4a04-b8db-048a460c1f64/edit?viewport_loc=-1662%2C-2150%2C5988%2C5794%2C0_0&invitationId=inv_f5c7878b-dc4e-4cf7-bcae-8e8470a05d0a' target='_blank'
>아키텍처 링크</a>


<br/>
<br/>


<h2>🎇트러블 슈팅</h2>

<h3>1. kakao map 호출 안 됌</h3>
<details>
<h4>1. TS으로 인한 타입 에러</h4>
<span>&ensp; 카카오 맵 오픈 api를 사용했다. kakao map에 있는 코드 붙였는데 오류가 계속 생겼다. 그 이유는 ts환경에서 처음 사용해서 타입으로 인해 오류가 발생했다. 그래서 계속 찾아보는 중 해결 방법을 찾았는데 window를 객체로 거기에 kakao를 any로 선언한 후 window 객체에서 kakako 속성을 추출해서 해결했다. </span>

  ```typescript
  // 코드 추가
  declare global { //타입 선언
    interface Window {
      kakao: any;
    }
  }

  const { kakao } = window; //window 객체에서 kakao라는 속성을 추출
  ...
  ```

<br/>
<hr/>

<h4>2. 트러블 슈팅은 아니지만 다양한 기능 추가</h4>
<span>&ensp;다양한 기능을 추가했다. 확대 축소 컨트롤, 커스텀 오버레이 생성, 클릭 시 page url 반환, 마커 클릭 시 이벤트 처리, 클린업 함수를 활용하여 이벤트 리스너 제거
</span>

  ```typescript
  // 코드 추가
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
  ...
  ```
</details>


<br/>


<h3>2. 로그인 페이지 인증 하지 않으면 막기</h3>
<details>
  <h4>1. prompt로 막기 (시작)</h4>
  <span>&ensp; 우선 tsx에 변수로 인증해야 하는 값을 넣고 prompt로 클라이언트에세 값을 받아 동일하면 페이지를 넘기는 현태로 구성했다. (임시로 했음. </span>
  <h4>2. 인증 값을 DB에 숨기고 모달 창으로 값을 받으며 발생한 오류</h4>
  <span>&ensp; 우선 처음 부딪힌 오류는 아무리 같은 useEffect에 있다고 해도 prompt가 먼저 호출된다는 것이다. 그래서 DB에 있는 인증값이 불러오기 전에 prompt가 반응해 반값으로 확인을 누르면 페이지로 넘어간다는 것이였다.  
   </span>
   <br/>
   <span>&ensp; 그리고 url로 접근 했을 때도 막아야 하기에 때문에 페이지를 넘어 갔을 때 팝업이 뜨는 형태였는데 관리자 - 요소에서 팝업 html을 지우면 로그인 기능을 사용할 수 있다는 것이다.  
   </span>
   <h4>3. 다시 prompt 사용해서 막고 어러번의 if문을 사용해 해결</h4>
   <span>&ensp; 우선 prompt로 클라이언트에게 값을 받고 if문을 이용해 값이 있으면 DB에서 인증 값을 가져오고 동일하면 페이지로 넘기고 아니면 home으로 보내게 했다. 이 기능은 useEffect로 페이지 접근 시 바로 prompt 뜨게 해결했다. 많은 사람들이 prompt는 옛날 기술이라 안쓴다는 이야기를 많이 하던데 오히려 보안 적으로는 더 잘 보호가 되서 나는 좋은 기능이라고 생각한다.
   </span>
  
  ```typescript
   useEffect(() => { //로그인 페이지 접속 시 인증 및 중복 로그인 막기
      if (loggedIn) {
          alert('이미 로그인 되어 있습니다.')
          navigate('/');
          return;
      }

      if (chack) {
          return;
      }

      const answer = prompt('관리자 로그인입니다. 인증번호를 입력해주세요', "");

      const checkCertification = async () => {
          // DB에서 인증 값 가져오는 코드...;

          if (certification === answer) {
              setChack(true);
              navigate('/login');
          } else {
              alert("인증 번호가 틀렸습니다. 제작자에게 문의하세요")
              navigate('/');
          }
      }

      if (answer == null || answer === '') {
          alert("인증 번호가 틀렸습니다. 제작자에게 문의하세요")
          navigate('/');
      } else (
          checkCertification()
      )
   }, [navigate, chack, loggedIn]);
  ...
  ```
</details>


<br/>


<h3>3. 첫 애니메이션 사용</h3>
<details>
  <h4>1. css 애니메이션 기능 첫 사용으로 인한 오류</h4>
  <span>&ensp; 페이지 넘기거나 횡스크롤에 반응에 글자들이 나타나는 기능을 구현하기 위해 react-intersection-observer 라이브러리를 쓰기 위해 공부하고 검색하고 사용을 했는데 전혀 적용이 되지 않았다. 1시간 후 이유를 알았다. router v6에 지원 안 된다는 것이다.
  </span>
  <h4>2. css로 애니메이션 구현 및 추후 Framer-motion로 구현</h4>
  <span>&ensp; 간단하게 css로 페이지 이동 시 효과를 반응하게 하고 필요한 기능을 다 구현한 후 Framer-motion로 계획한 기능들을 추가할 계획이다. 
  </span>
  
  ```typescript
  import styled, {keyframes} from "styled-components";

  const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  `;

  export const PageBody = styled.div`
    width: 100%;
    animation: ${fadeInAnimation} 0.3s ease-in;
  `;
  ...
  ```
  
</details>
