import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import LogIn from './pages/LogIn';
import Introduction from "./pages/Introduction";
import Vision from "./components/Introductoin/Vision";
import History from "./components/Introductoin/History";
import Rev from "./components/Introductoin/Rev";
import Pastors from "./components/Introductoin/Pastors";
import Elder from "./components/Introductoin/Elder";
import SketchMap from "./components/Introductoin/SketchMap";
import Schedule from './pages/Schedule';
import YearSchedule from "./components/Schedule/YearSchedule";
import WorshipTime from "./components/Schedule/WorshipTime";
import Youtube from './pages/Youtube';
import YoutubePosts from "./components/Youtube/YoutubePosts";
import PostDetail from "./components/Youtube/PostDetail";
import WritinPost from "./components/Youtube/WritinPost";
import Ministry from './pages/Ministry';
import Mission from './pages/Mission';
import NotFound from "./pages/NotFound";


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
                        path: 'rev',
                        element: <Rev />
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
                children: [
                    {
                        path: 'worship-time',
                        element: <WorshipTime />,
                    },
                    {
                        path: 'year',
                        element: <YearSchedule />,
                    },
                ],
            },
            {
                path: `youtube`,
                element: <Youtube />,
                children: [
                    {
                        path: 'posts',
                        element: <YoutubePosts />,
                    },
                    {
                        path: 'detail/:postsId',
                        element: <PostDetail />,
                    },
                    {
                        path: 'writin-post',
                        element: <WritinPost />
                    },
                ],
            },
            {
                path: `ministry`,
                element: <Ministry />,
            },
            {
                path: `mission`,
                element: <Mission />,
            },
        ],
        errorElement: <NotFound />
    }
]);

export default router;