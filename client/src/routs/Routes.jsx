import {
  createBrowserRouter,
 
} from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import TaskBoard from "../components/TaskBoard";
import UpdateTask from "../pages/UpdateTask";
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
        element:<TaskBoard />
      },
      {
        path:'/update',
        element:<UpdateTask />
      }
    ]
  },
]);
export default router;
