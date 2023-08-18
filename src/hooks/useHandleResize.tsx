import { useEffect, useState } from "react";

const useHandleResize = () => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth); //웹 넓이 

    useEffect(() => { 
        const handleResize = () => {
            setwindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return windowWidth;
}

export default useHandleResize;