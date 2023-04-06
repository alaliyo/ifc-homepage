import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import LogIn from './pages/LogIn';
import Introduction from "./pages/Introduction";
import Schedule from './pages/Schedule';
import Youtube from './pages/Youtube';
import Ministry from './pages/Ministry';
import Mission from './pages/Mission';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: ``,
                element: <Home />
            },
            {
                path: `logIn`,
                element: <LogIn />
            },
            {
                path: `introduction`,
                element: <Introduction />
            },
            {
                path: `schedule`,
                element: <Schedule />
            },
            {
                path: `youtube`,
                element: <Youtube />
            },
            {
                path: `ministry`,
                element: <Ministry />
            },
            {
                path: `mission`,
                element: <Mission />
            },
        ]
    }
]);

export default router;