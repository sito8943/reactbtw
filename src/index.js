import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import { NextUIProvider } from "@nextui-org/react";
//import App from "./App";

// context
import { ContextProvider } from "./context/ContextProvider";
import { GraphicConfigProvider } from "./context/GraphicConfig";
import { AudioConfigProvider } from "./context/AudioConfig";
import { OffCanvasProvider } from "./context/OffCanvas";
import { AudioControllerProvider } from "./context/AudioController";
import { LanguageProvider } from "./context/Language";
import { CreationAnimationProvider } from "./context/CreationAnimation";
import { BattleProvider } from "./context/BattleProvider";

// styles
import "./index.css";
import "./components/Kenburns/kenburns.css";

import Test from "./test";
import Battle from "./views/Battle/Battle";
import Home from "./home";

import "tippy.js/dist/tippy.css"; // optional

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCharacter from "./views/CreateCharacter/CreateCharacter";
import CardTester from "./CardTester";
import AudioController from "./components/AudioController/AudioController";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <StrictMode>
    <NextUIProvider>
      <LanguageProvider>
        <ContextProvider>
          <GraphicConfigProvider>
            <AudioConfigProvider>
              <OffCanvasProvider>
                <AudioControllerProvider>
                  <CreationAnimationProvider>
                    <BrowserRouter>
                      <Routes>
                        <Route
                          path="/creation"
                          element={
                            <>
                              <AudioController />
                              <CreateCharacter />
                            </>
                          }
                        />
                        <Route
                          path="/"
                          element={
                            <BattleProvider>
                              <AudioController />
                              {/*<CardTester />*/}
                              <Battle />
                            </BattleProvider>
                          }
                        />
                      </Routes>
                    </BrowserRouter>
                  </CreationAnimationProvider>
                </AudioControllerProvider>
              </OffCanvasProvider>
            </AudioConfigProvider>
          </GraphicConfigProvider>
        </ContextProvider>
      </LanguageProvider>
    </NextUIProvider>
  </StrictMode>
);
