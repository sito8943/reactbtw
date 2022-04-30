import { useEffect, useState } from "react";
import AudioController from "./components/AudioController/AudioController";
import { CreationAnimationProvider } from "./context/CreationAnimation";
import CreateCharacter from "./views/CreateCharacter/CreateCharacter";

const Test = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <button onClick={() => setLoading(true)}>Hola</button>
      <AudioController />
      {loading && (
        <CreationAnimationProvider>
          <CreateCharacter />
        </CreationAnimationProvider>
      )}
    </div>
  );
};

export default Test;
