import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { base64encode } from "nodejs-base64";

// context
import { useContext } from "./context/ContextProvider";
import { useOffCanvas } from "./context/OffCanvas";

// models
import User from "./models/User";

// utils
import { GetTexts } from "./lang/texts";
import { LoadFromStorage } from "./utils/storageFuncions";

// components
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import TopBar from "./components/TopBar/TopBar";

// views
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotMatch from "./views/NotMatch/NotMatch";

const App = () => {
  const { setOffCanvasState } = useOffCanvas();
  const { contextState, setContextState } = useContext();

  const [loading, setLoading] = useState(true);

  const init = async () => {
    if (contextState.name === undefined) {
      LoadFromStorate();  
    }
    
  };

  const closeOffCanvas = (e) => {
    if (e.target.id !== "off-canvas")
      setOffCanvasState({type: "toggle"});
  }

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div onClick={(e) => {
      alert(e.target.id)
    }}>
      <Loading type="big" visible={loading} />
      {!loading ? (
        <Router>
          {contextState.name !== undefined ? <TopBar texts={GetTexts(contextState.lang, "TopBar")} /> : <></>}
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
          {contextState.action != 1 ? <Footer texts={GetTexts(contextState.lang, "Footer")} /> : <></> }
        </Router>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
