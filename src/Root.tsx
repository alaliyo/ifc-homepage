import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from './firebase';
import { Spinner } from 'react-bootstrap';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import styled, { createGlobalStyle } from 'styled-components';

function Root() {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth); //웹 넓이 
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  //웹 넓이에 반응
  useEffect(() => { 
      const handleResize = () => {
          setwindowWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, [])

  // 모든 컴포넌트들이 로딩되었는지 확인하는 이벤트
  useEffect(() => {
    const handleLoad = () => {
      setInit(true);
    };
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // 로그인 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }
      setInit(true);
    })
  }, []);

  return (
    <div>
      {init ? (<>
        <GlobalStyle />
        <Header WindowSize={windowWidth} loggedIn={loggedIn} />
          <Outlet context={{
            windowWidth: windowWidth,
            loggedIn: loggedIn,
          }} />
        <Footer />
      </>) : (
        <SpinnerStyled animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </SpinnerStyled>
      )}
    </div>
  );
}

export default Root;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'NanumSquareRound';
  }
`;

const SpinnerStyled = styled(Spinner)`
  margin: 200px 46%;
`;