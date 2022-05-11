import { Admin } from "@/pages/Admin";
import { View } from "@/pages/View";
import { FunctionComponent, Suspense } from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";

const App: FunctionComponent = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/view" /> },
      { path: "/view", element: <View /> },
      { path: "/admin", element: <Admin /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];

export const AppRoutes: FunctionComponent = () => {
  const element = useRoutes(routes);
  return element;
};
