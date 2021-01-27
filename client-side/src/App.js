import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import Router from "./router/router";
import reduxStore from "./redux/store";

const { store, persistor } = reduxStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  shadows: ["none"],

  palette: {
    primary: {
      main: "#0A3C70",
    },
    secondary: {
      main: "#FF0000",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontFamily: "Roboto",
      fontSize: "1.1rem",
      fontWeight: "500",
    },
    h2: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      fontWeight: "500",
    },
    h3: {
      fontFamily: "Roboto",
      fontSize: ".9rem",
      fontWeight: "500",
    },
    h4: {},
    h5: {},
    h6: {
      fontSize: "1.6rem",
      fontWeight: "400",
    },

    subtitle1: {
      fontSize: ".9rem",
      fontWeight: "400",
      lineHeight: "18px",
      color: "#6A6A6A",
    },
    subtitle2: {
      fontFamily: "Roboto",
      //color: "#555555",
      lineheight: "10px",
      fontSize: "15px",
    },
    body1: {
      //fontFamily: "circle",
      //fontSize: "1.2rem",
      //fontWeight: "400",
      //color: "#6A6A6A",
    },
    body2: {
      fontFamily: "Roboto",
      //color: "#555555",
      fontSize: "15px",
      boxShadow: "0 -1px 10px rgba(0,0,0 .15)",
    },
    button: {},
  },
});

export default App;
