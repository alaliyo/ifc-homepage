import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from './firebase';
import { Spinner } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import styled, { createGlobalStyle } from 'styled-components';

function Root() {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth); //웹 넓이 
  const [init, setInit] = useState(false); // 로그인 되어 있는지 확인
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { //웹 얿이에 반응
      const handleResize = () => {
          setwindowWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, [])

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