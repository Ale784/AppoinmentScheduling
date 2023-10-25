import { Navigate, Outlet  } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { APP_ROUTES } from "../Utils/Constans";


export function ProtectedRoute()
{
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"}/>;
    }

    return <Outlet />

}

// If token exist send user to the home
export function RouteIfUserIsLogIn()
{
    const location = window.location.pathname.toLowerCase();
    const { token } = useAuth();


    if(location == APP_ROUTES.SIGN_IN || location == APP_ROUTES.SIGN_UP)
    {
        if(token)
        {
            
    console.log("hey")
            return <Navigate to={APP_ROUTES.HOME} />
        } 
    }


    return <Outlet />
}