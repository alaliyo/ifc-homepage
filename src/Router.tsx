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
import KrPosts from "./components/Youtube/KrPosts";
import EnPosts from "./components/Youtube/EnPosts";
import PostDetail from "./components/Youtube/PostDetail";
import WritinPost from "./components/Youtube/WritinPost";
import Ministry from './pages/Ministry';
import Mission from './pages/Mission';
import NotFound from "./pages/NotFound";
import Overseas from "./components/Mission/Overseas";
import Domestic from "./components/Mission/Domestic";

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
                        path: 'kr-posts',
                        element: <KrPosts />,
                    },
                    {
                        path: 'En-posts',
                        element: <EnPosts />,
                    },
                    {
                        path: 'detail/:category/:postsId',
                        element: <PostDetail />,
                    },
                    {
                        path: ':category/writin',
                        element: <WritinPost />
                    },
                ],
            },
            {
                path: `mission`,
                element: <Mission />,
                children:[
                    {
                        path: 'overseas',
                        element: <Overseas />,
                    },
                    {
                        path: 'domestic',
                        element: <Domestic />,
                    },
                ]
            },
            {
                path: `ministry`,
                element: <Ministry />,
            },
        ],
        errorElement: <NotFound />
    }
]);

export default router;