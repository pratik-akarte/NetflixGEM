import Body from "./Components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Components/Browse";
import GPTsearch from "./Components/GPTsearch";

const App = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Body /> },
    { path: "/browse", element: <Browse /> },
    {path:"/GPTsearch", element: <GPTsearch/>}
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
