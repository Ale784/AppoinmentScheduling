import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { API_ROUTES, APP_ROUTES } from "../Utils/Constans";

export function AppRoutes() {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: APP_ROUTES.SIGN_IN,
      element: <Login />,
    },
    {
      path: APP_ROUTES.SIGN_UP,
      element: <Register />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Navigate to={APP_ROUTES.HOME} />,
        },
        {
          path: APP_ROUTES.HOME,
          element: <Home />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}
