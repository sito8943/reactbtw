import React from "react";
import { useEffect, useState } from "react";
import SitoContainer from "sito-container";

import Character, { NPCEnum } from "./models/Character";
import CombatPortrait from "./components/CharacterPortrait/CombatPortrait/CombatPortrait";

const CardTester = () => {
  const [item, setItem] = useState();

  useEffect(() => {
    const dataUser = localStorage.getItem("btw-user-data");
    const player = new Character({
      ...JSON.parse(dataUser),
      ...NPCEnum.character,
    });
    setItem(player);
  }, []);

  return (
    <SitoContainer
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100vw", height: "100vh" }}
    >
      {item && <CombatPortrait id="Dummy" character={item} />}
    </SitoContainer>
  );
};

export default CardTester;
