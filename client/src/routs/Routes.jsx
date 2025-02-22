import {
  createBrowserRouter,
 
} from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import TaskBoard from "../components/TaskBoard";
import UpdateTask from "../pages/UpdateTask";
import Form from "../components/Form";
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
        path:'/update/:id',
        element:<UpdateTask />
      },
      {
        path:'/addtask',
        element:<Form />
      }
    ]
  },
]);
export default router;
