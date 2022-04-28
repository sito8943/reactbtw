import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// context
import { useContext } from "./context/ContextProvider";
import { useOffCanvas } from "./context/OffCanvas";
import { useAudioConfig } from "./context/AudioConfig";
import { useGraphicConfig } from "./context/GraphicConfig";
import { useAudioController } from "./context/AudioController";
import { useLanguage } from "./context/Language";

// models
import User from "./models/User";

// utils
import { LoadFromStorage } from "./utils/storageFunctions";

// components
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import TopBar from "./components/TopBar/TopBar";
import AudioController from "./components/AudioController/AudioController";

// views
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotMatch from "./views/NotMatch/NotMatch";

const App = () => {
  const { offCanvasState, setOffCanvasState } = useOffCanvas();
  const { contextState, setContextState } = useContext();
  const { audioConfigState, setAudioConfigState } = useAudioConfig();
  const { graphicConfigState, setGraphicConfigState } = useGraphicConfig();
  const { setAudioControllerState } = useAudioController();

  const [loading, setLoading] = useState(true);

  const { languageState, setLanguageState } = useLanguage();

  useEffect(() => {
    // fetching from local storage
    const lang =
      localStorage.getItem("lang") === null ||
      localStorage.getItem("lang") === undefined
        ? "en"
        : localStorage.getItem("lang");
    if (lang !== window.navigator.language)
      localStorage.setItem("lang", window.navigator.language);
    setLanguageState({ type: "set", lang: lang.split("-")[0] });
  }, []);

  const init = async () => {
    if (contextState.name === undefined) {
      const result = LoadFromStorage();
      setContextState({
        type: "log-in",
        data: result.user,
      });
      setAudioConfigState({
        type: "set",
        data: result.audio,
      });
      setGraphicConfigState({
        type: "set",
        data: result.graphic,
      });
    }
    setLoading(false);
  };

  const closeOffCanvas = (e) => {
    if (e.target.id !== "off-canvas" && offCanvasState.visible) {
      setOffCanvasState({ type: "hidden" });
      if (audioConfigState.sfx)
        setAudioControllerState({ type: "play-pop-up" });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div onClick={closeOffCanvas}>
      <Loading type="big" visible={loading} />
      {!loading ? (
        <Router>
          <AudioController />
          {contextState.name !== undefined && <TopBar />}
          <Routes exact path="/" element={<div></div>}>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotMatch />} />
          </Routes>
          {contextState.action !== 1 && <Footer />}
        </Router>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
