import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loading from "./Level2Components/Loading";
import { useAutoLogout } from "./hooks/useAutoLogout";

const Body = lazy(() => import("./Components/Body"));
const Browse = lazy(() => import("./Components/Browse"));
const GeminiSearch = lazy(() => import("./Components/GeminiSearch"));
const NotFound = lazy(() => import("./Level2Components/NotFound"));

const App = () => {

  useAutoLogout();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Body />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/browse",
      element: (
        <Suspense fallback={<Loading />}>
          <Browse />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/GeminiSearch",
      element: (
        <Suspense fallback={<Loading />}>
          <GeminiSearch />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
