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
    setPlayers([player, player, player, player]);
    setEnemies([enemy, enemy, enemy, enemy]);
  }, []);

  const doAttack = () => {
    setShowAnimation(true);
    const currentTarget = document.getElementById("Hola");
    setTarget({
      x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
      y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
      class: "",
      index: 0,
    });
    setTimeout(() => {
      setShowAnimation(false);
      setTarget({
        x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
        y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
        subclass: "shake",
        class: "red",
        index: 0,
      });
      setTimeout(() => {
        setTarget({
          x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
          y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
          class: "",
          index: -1,
        });
      }, 301);
    }, 500);
  };

  return (
    <Container
      justifyContent="space-between"
      flexDirection="column"
      sx={{ padding: "18px 20px 10px 20px", height: "95vh" }}
    >
      <Container justifyContent="right">
        {enemies.map((item, i) => {
          return (
            <Container className={target.index === i ? target.subclass : ""}>
              <CombatPortrait
                id="Hola"
                key={`enemy${item.Name}${i}`}
                character={item}
                className={target.index === i ? target.class : ""}
              />
            </Container>
          );
        })}
      </Container>
      <button onClick={doAttack}>Hola</button>
      <Container>
        {showAnimation && (
          <Animation
            which="slash"
            target={{
              x: target.x,
              y: target.y,
            }}
          />
        )}
      </Container>
      <Container justifyContent="left">
        {players.map((item, i) => {
          return (
            <CombatPortrait
              id="item.Name"
              key={`${item.Name}${i}`}
              character={item}
            />
          );
        })}
      </Container>
    </Container>
  );
};

export default Battle;
