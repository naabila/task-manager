import {
  createBrowserRouter,
 
} from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import TaskBoard from "../components/TaskBoard";
import UpdateTask from "../pages/UpdateTask";
import Form from "../components/Form";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/taskboard',
        element:<PrivateRoute><TaskBoard /></PrivateRoute>
      },
      {
        path:'/update/:id',
        element:<PrivateRoute><UpdateTask /></PrivateRoute>
      },
      {
        path:'/addtask',
        element:<PrivateRoute><Form /></PrivateRoute>
      }
    ]
  },
]);
export default router;
