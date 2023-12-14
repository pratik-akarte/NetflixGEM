import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import userStore from "../src/utils/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider>
    <Provider store={userStore}>
      <App />
    </Provider>
  </ChakraProvider>
  //  </React.StrictMode>
);
