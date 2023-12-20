import Body from "./Components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Components/Browse";

import GeminiSearch from "./Components/GeminiSearch";

const App = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Body /> },
    { path: "/browse", element: <Browse /> },
    {path:"/Geminisearch", element: <GeminiSearch/>}
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
