import { useState, useEffect } from "react";

// models
import Character from "../../models/Character";

// own components
import Animation from "../../components/Animation/Animation";
import CombatPortrait from "../../components/CharacterPortrait/CombatPortrait/CombatPortrait";
import Container from "../../components/Container/Container";

const Battle = () => {
  const [enemies, setEnemies] = useState([]);
  const [players, setPlayers] = useState([]);

  const [showAnimation, setShowAnimation] = useState(false);
  const [target, setTarget] = useState({ offsetLeft: 0, offsetTop: 0 });

  useEffect(() => {
    const dataUser = localStorage.getItem("btw-user-data");
    const player = new Character(JSON.parse(dataUser));
    const enemy = new Character(JSON.parse(dataUser));
    setPlayers([player]);
    setEnemies([enemy]);
  }, []);

  return (
    <Container
      justifyContent="space-between"
      flexDirection="column"
      sx={{ padding: "18px 20px 10px 20px", height: "95vh" }}
    >
      <Container justifyContent="right">
        {enemies.map((item, i) => {
          return <CombatPortrait id="Hola" key={item.Name} character={item} />;
        })}
      </Container>
      <Container>
        {showAnimation && (
          <Animation
            which="slash"
            target={{
              x: target.offsetLeft,
              y: target.offsetTop,
            }}
          />
        )}
      </Container>
      <Container justifyContent="left">
        {players.map((item, i) => {
          return (
            <CombatPortrait id="item.Name" key={item.Name} character={item} />
          );
        })}
      </Container>
    </Container>
  );
};

export default Battle;
