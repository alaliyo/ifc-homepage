import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';

function Root() {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth); //웹 넓이 

  useEffect(() => { //웹 얿이에 반응
      const handleResize = () => {
          setwindowWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div>
      <Header WindowSize={windowWidth} />
      <Outlet context={{
        windowWidth: windowWidth,
      }} />
    </div>
  );
}

export default Root;