import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, RootPage } from "./pages";
import HomePage from "./pages/HomePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <HomePage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
