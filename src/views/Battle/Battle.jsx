import { useState, useEffect } from "react";
import Character from "../../models/Character";
import CombatPortrait from "../../components/CharacterPortrait/CombatPortrait/CombatPortrait";

const Battle = () => {
  const [enemies, setEnemies] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const dataUser = localStorage.getItem("btw-user-data");
    const player = new Character(JSON.parse(dataUser));
    setPlayers([player]);
  }, []);

  return (
    <div>
      <div></div>
      <div>
        {players.map((item, i) => {
          return <CombatPortrait key={item.Name} character={item} />;
        })}
      </div>
    </div>
  );
};

export default Battle;
