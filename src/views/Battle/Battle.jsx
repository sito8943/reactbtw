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
    setPlayers([player]);
    setEnemies([new Character({ name: "Enemigo", level: 2, class: 0 })]);
  }, []);

  const doAttack = () => {
    setShowAnimation(true);
    const currentTarget = document.getElementById("Hola");
    setTarget({
      x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
      y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
      class: "",
      player: 0,
      index: 0,
    });
    setTimeout(() => {
      setShowAnimation(false);
      setTarget({
        x: currentTarget.offsetLeft + 70, // + currentTarget.offsetWidth / 2,
        y: currentTarget.offsetTop + 85, // + currentTarget.offsetHeight / 2,
        subclass: "shake",
        class: "red",
        player: 0,
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
            <Container
              key={`enemy${item.Name}${i}`}
              className={
                target.player === 0 && target.index === i ? target.subclass : ""
              }
            >
              <CombatPortrait
                id="Hola"
                character={item}
                className={
                  target.player === 0 && target.index === i ? target.class : ""
                }
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
            <Container
              key={`${item.Name}${i}`}
              className={
                target.player === 1 && target.index === i ? target.subclass : ""
              }
            >
              <CombatPortrait
                id="item.Name"
                character={item}
                className={
                  target.player === 1 && target.index === i ? target.class : ""
                }
              />
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};

export default Battle;
