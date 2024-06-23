import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import {store} from "./app/store";
import { Provider } from "react-redux";
const fonts = {
  body: "Raleway",
  heading: "Prompt",
  mono: "Lato",
  solo: "Roboto",
};
const theme = extendTheme({ fonts });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
