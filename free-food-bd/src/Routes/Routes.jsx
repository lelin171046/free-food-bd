import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErorrPage from "../Component/ErorrPage";
import Home from "../Component/Home";
import AddFood from "../Pages/AddFood";
import AvailableFood from "../Pages/AvailableFood";

import FoodRequest from "../Component/FoodRequest";
import MyFood from "../Component/MyFood";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import App from "../App";
import UpdateFood from "../Component/UpdateFood";
import FoodDetails from "../Pages/FoodDetails";
import Contact from "../Pages/Contact";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErorrPage></ErorrPage>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/add-food',
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path: '/available-food',
                element: <AvailableFood></AvailableFood>
            },
            {
                path: '/food-details/:id',
                element: <FoodDetails></FoodDetails>,
                loader: ({params}) => fetch(`http://localhost:3003/food/${params.id}`)
            },
            {
                path: '/my-food-request',
                element: <FoodRequest></FoodRequest>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/my-food',
                element: <MyFood></MyFood>
            },
            {
                path: '/login',
                element: <Login></Login>
                

            },
            {
                path: '/profile',
                element: <Profile></Profile>
            }
            ,
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/food-details/:id',
                element: <FoodDetails></FoodDetails>
            },
            {
                path: '/demo',
                element: <App></App>
            },
            {
                path: '/update-food/:id',
                element: <UpdateFood></UpdateFood>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`)
                
            },
            // {
            //     path: '/food-details/:id',
            //     element: <FoodDetails></FoodDetails>
            // }

        ]
    }
])

export default router;