import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout";
import NotFound from "./pages/NotFound";


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


import Ministry from './pages/Ministry';
import Mission from './pages/Mission';
import Overseas from "./components/Mission/Overseas";
import Domestic from "./components/Mission/Domestic";


import EventStory from "./pages/EventStory";
import EventPosts from "./components/EventStory/EventPosts";
import EventPostDetail from "./components/EventStory/EventPostDetail";
import EventWritin from "./components/EventStory/EventWritin";
import Weekly from "./components/Schedule/Weekly";
import WeeklyList from "./components/Schedule/WeeklyList";
import WeeklyDetail from "./components/Schedule/WeeklyDetail";


import AdminPage from "./admin/AdminPage";
import AdminLogIn from './admin/pages/LogIn'
import AdminHome from './admin/pages/Home'

import BulletinBoard from "./admin/pages/BulletinBoard";
import AdminHistory from "./admin/components/BulletinBoard/AdminHistory";
import AdminYear from "./admin/components/BulletinBoard/AdminYear";
import AdminServers from "./admin/components/BulletinBoard/AdminServers";
import AdminYoutube from "./admin/components/BulletinBoard/AdminYoutube";
import AdminWeekly from "./admin/components/BulletinBoard/AdminWeekly";

import User from "./admin/pages/User";
import Certification from "./admin/components/User/Certification";

import Maintain from "./admin/pages/Maintain";

import Manual from "./admin/pages/Manual";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: ``,
                element: <Home />,
            },
            {
                path: '',
                element: <PageLayout />,
                children: [
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
                            {
                                path: 'weekly',
                                element: <Weekly />,
                                children: [
                                    {
                                        path: "list",
                                        element: <WeeklyList />,
                                    },
                                    {
                                        path: ":postId",
                                        element: <WeeklyDetail />,
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        path: `youtube`,
                        element: <Youtube />,
                        children: [
                            {
                                path: 'youtube-kr',
                                element: <KrPosts />,
                            },
                            {
                                path: 'youtube-en',
                                element: <EnPosts />,
                            },
                            {
                                path: 'detail/:category/:postsId',
                                element: <PostDetail />,
                            },
                        ],
                    },
                    {
                        path: `event-story`,
                        element: <EventStory />,
                        children: [
                            {
                                path: 'post',
                                element: <EventPosts />,
                            },
                            {
                                path: 'post/:postId',
                                element: <EventPostDetail />,
                            },
                            {
                                path: 'post/writin',
                                element: <EventWritin />,
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
            },
        ],
        errorElement: <NotFound />
    },
    {
        path: "/admin",
        element: <AdminPage />,
        children: [
            {
                path: "",
                element: <AdminLogIn />,
            },
            {
                path: "home",
                element: <AdminHome />,
            },
            {
                path: "bulletin-board",
                element: <BulletinBoard />,
                children: [
                    {
                        path: "history",
                        element: <AdminHistory />,
                    },
                    {
                        path: "year",
                        element: <AdminYear />,
                    },
                    {
                        path: "youtube",
                        element: <AdminYoutube />,
                    },
                    {
                        path: "servers",
                        element: <AdminServers />,
                    },
                    {
                        path: "weekly",
                        element: <AdminWeekly />,
                    },
                ]
            },
            {
                path: "user",
                element: <User />,
                children: [
                    {
                        path: "certification",
                        element: <Certification />,
                    },
                ]
            },
            {
                path: "maintain",
                element: <Maintain />,
            },
            {
                path: "manual",
                element: <Manual />,
            },
        ]
    }
]);

export default router;