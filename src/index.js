import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
//import App from "./App";

// context
import { ContextProvider } from "./context/ContextProvider";
import { GraphicConfigProvider } from "./context/GraphicConfig";
import { AudioConfigProvider } from "./context/AudioConfig";
import { OffCanvasProvider } from "./context/OffCanvas";
import { AudioControllerProvider } from "./context/AudioController";
import { LanguageProvider } from "./context/Language";

// styles
import "./index.css";
import "./components/Kenburns/kenburns.css";

import Container from "./components/Container/Container";
import CharacterPortrait from "./components/CharacterPortrait/CharacterPortrait";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <StrictMode>
    <LanguageProvider>
      <ContextProvider>
        <GraphicConfigProvider>
          <AudioConfigProvider>
            <OffCanvasProvider>
              <AudioControllerProvider>
                {/*<App />*/}
                <Container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "100vw",
                    height: "100vh",
                    background: "#383838",
                  }}
                >
                  <CharacterPortrait />
                </Container>
              </AudioControllerProvider>
            </OffCanvasProvider>
          </AudioConfigProvider>
        </GraphicConfigProvider>
      </ContextProvider>
    </LanguageProvider>
  </StrictMode>
);
