import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import Login from "./Components/Auth/Login.jsx";
import SignUp from "./Components/Auth/SignUp.jsx";
import CreateProjectForm from "./Components/Pages/Dashboard/CreateProjectForm.jsx";
import JoinTodo from "./Components/Pages/JoinTodo/JoinTodo.jsx";
import MemeberTodo from "./Components/Pages/Members/MemeberTodo.jsx";
import Dashboard from "./Components/Pages/Dashboard/Dashboard.jsx";
import AdminTodo from "./Components/Pages/Members/AdminTodo.jsx";
import GroupLayout from "./Components/Pages/Group/GroupLayout.jsx";
import CommentBox from "./Components/Pages/Comment/CommentBox.jsx";
import Profile from "./Components/Auth/Profile.jsx";
import PageNotFound from "./Components/Layout/PageNotFound.jsx";
import ProtectedRoute from "./Components/Layout/ProtectedRoute.jsx";
import SignUp2 from "./Components/Auth/SignUp2.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><App /></ProtectedRoute>,
        errorElement : <PageNotFound />,
        children : [
            {path : '' , element : <Dashboard />},
            {path : 'member' , element : <MemeberTodo />},
            {path : 'admin' , element : <AdminTodo />},
            {path : 'profile' , element : <Profile />},
            {path : 'create' , element : <CreateProjectForm />},
        ]
    },
    {
        path : '/group/:groupId',
        element: <ProtectedRoute><GroupLayout /></ProtectedRoute>,
        errorElement : <PageNotFound />,
    },
    {
        path: '/login',
        element: <Login />,
         errorElement : <PageNotFound />,
    },
    {
        path: '/signup',
        element: <SignUp />,
        errorElement : <PageNotFound />,
    },
      {
        path: '/signup2',
        element: <SignUp2 />,
        errorElement : <PageNotFound />,
    },
    // {
    //     path: '/create',
    //     element: <CreateProjectForm />,
    //     errorElement : <PageNotFound />,

    // },
  
])

export default router


