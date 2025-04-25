import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import AddListingPage from "../Pages/AddListingPage/AddListingPage";
import DetailsPage from "../Pages/DetailsPage/[id]/DetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "listing", element: <ProtectedRoute><RegisterPage/></ProtectedRoute>},
            {path: "profile", element: <ProtectedRoute><ProfilePage/></ProtectedRoute>},
            {path: "add-listing", element: <ProtectedRoute><AddListingPage/></ProtectedRoute>},
            {path: "details-page/:id", element: <DetailsPage/>},
        ]
    }
])