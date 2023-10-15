import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider, SignUp, SignIn } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthPage, ErrorPage, NewUserPage, RootPage } from "./pages";
import HomePage from "./pages/HomePage";

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      element: <AuthPage />,
      children: [
        {
          path: "/sign-up/*",
          element: (
            <SignUp
              routing="path"
              path="/sign-up"
              afterSignUpUrl="/new-user"
              signInUrl="/sign-in"
            />
          ),
        },
        {
          path: "/sign-in/*",
          element: (
            <SignIn
              routing="path"
              path="/sign-in"
              afterSignInUrl="/new-user"
              signUpUrl="/sign-up"
            />
          ),
        },
      ],
    },
    { path: "/new-user", element: <NewUserPage /> },
  ]);

  const clerkKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
