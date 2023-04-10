import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import LogIn from './pages/LogIn';
import Introduction from "./pages/Introduction";
import Schedule from './pages/Schedule';
import Youtube from './pages/Youtube';
import Ministry from './pages/Ministry';
import Mission from './pages/Mission';
import Vision from "./components/Introductoin/Vision";
import History from "./components/Introductoin/History";
import Pastor from "./components/Introductoin/Pastor";
import Pastors from "./components/Introductoin/Pastors";
import Elder from "./components/Introductoin/Elder";
import SketchMap from "./components/Introductoin/SketchMap";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: ``,
                element: <Home />,
            },
            {
                path: `logIn`,
                element: <LogIn />,
            },
            {
                path: `introduction`,
                element: <Introduction />,
                children: [
                    {
                        path: 'vision',
                        element: <Vision />
                    },
                    {
                        path: 'history',
                        element: <History />
                    },
                    {
                        path: 'pastor',
                        element: <Pastor />
                    },
                    {
                        path: 'pastors',
                        element: <Pastors />
                    },
                    {
                        path: 'elder',
                        element: <Elder />
                    },
                    {
                        path: 'sketch-map',
                        element: <SketchMap />
                    },
                ],
            },
            {
                path: `schedule`,
                element: <Schedule />,
            },
            {
                path: `youtube`,
                element: <Youtube />,
            },
            {
                path: `ministry`,
                element: <Ministry />,
            },
            {
                path: `mission`,
                element: <Mission />,
            },
        ]
    }
]);

export default router;