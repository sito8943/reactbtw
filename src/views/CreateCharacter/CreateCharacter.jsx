import { useState } from "react";

import Container from "../../components/Container/Container";
import CharacterPortrait from "../../components/CharacterPortrait/CharacterPortrait";

const CreateCharacter = () => {
  const [name, setName] = useState("");

  const handleName = (newName) => setName(name);

  return (
    <Container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <CharacterPortrait edit changeName={handleName} />
    </Container>
  );
};

export default CreateCharacter;
