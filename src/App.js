import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { base64encode } from "nodejs-base64";
import { storageFunction } from "storage-function";

// context
import { useContext } from "./context/ContextProvider";

// models
import User from "./models/User";

// utils
import { GetTexts } from "./lang/texts";

// components
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import TopBar from "./components/TopBar/TopBar";

// views
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotMatch from "./views/NotMatch/NotMatch";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { contextState, setContextState } = useContext();

  const init = async () => {
    if (contextState.user.Name === undefined) {
      if (storageFunction.fromLocalStorage("user") !== null)
        setContextState({
          type: "log-in",
          user: new User(
            base64encode(storageFunction.fromLocalStorage("user")),
            storageFunction.fromLocalStorage("user")
          ),
        });
      else if (storageFunction.fromSessionStorage("user") !== null)
        setContextState({
          type: "log-in",
          user: new User(
            base64encode(storageFunction.fromSessionStorage("user")),
            storageFunction.fromSessionStorage("user")
          ),
        });
    }
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div>
      <Loading type="big" visible={loading} />
      {!loading ? (
        <Router>
          {contextState.user.Name !== undefined ? <TopBar texts={GetTexts(contextState.lang, "Topbar")} /> : <></>}
          <Routes exact path="/" element={<div></div>}>
            <Route
              index
              element={<Login texts={GetTexts(contextState.lang, "Login")} />}
            />
            <Route
              path="/home"
              element={<Home texts={GetTexts(contextState.lang, "Login")} />}
            />
            <Route
              path="*"
              element={
                <NotMatch texts={GetTexts(contextState.lang, "NotMatch")} />
              }
            />
          </Routes>
          <Footer texts={GetTexts(contextState.lang, "Footer")} />
        </Router>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
