import Body from "./Components/Body";
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Browse from "./Components/Browse";

import GeminiSearch from "./Components/GeminiSearch";
import NotFound from "./Level2Components/NotFound";

const App = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Body />, errorElement: <NotFound /> },
    { path: "/browse", element: <Browse />, errorElement: <NotFound /> },
    {
      path: "/GeminiSearch",
      element: <GeminiSearch />,
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
