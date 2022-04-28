import React, { useState, useEffect } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// images
import main from "../../img/bg/main.jpg";
import compass from "../../img/compass.svg";

// context
import { useContext } from "../../context/ContextProvider";
import { useGraphicConfig } from "../../context/GraphicConfig";
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";
import { useLanguage } from "../../context/Language";
import { useForm } from "react-hook-form";

// utils
import { login } from "../../services/post";
import { SaveToStorage } from "../../utils/storageFunctions.js";

// models
import User from "../../models/User";
import Config from "../../models/Config";

// components
import Loading from "../../components/Loading/Loading";
import ShootingStars from "../../components/ShootingStars/ShootingStars";
import Toggle from "../../components/Toggle/Toggle";
import Card from "../../components/Card/Card";

const Login = () => {
  const { languageState } = useLanguage();
  const { register, handleSubmit } = useForm();
  const { contextState, setContextState } = useContext();
  const { graphicConfigState, setGraphicConfigState } = useGraphicConfig();
  const { audioConfigState, setAudioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();

  const [remember, setRemember] = useState(false);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(true);

  const init = () => {};

  const setUserPlaying = () => {
    setContextState({ type: "change-user-action" });
    if (audioConfigState.sfx) play("big-click");
  };

  const signIn = async (d) => {
    setUserError("");
    setPasswordError("");
    if (d.n === "") {
      setUserError(languageState.texts.Login.Errors.EmptyUser);
      document.getElementById("user").focus();
    } else if (d.p === "") {
      setPasswordError(languageState.texts.Login.Errors.EmptyPassword);
      document.getElementById("password").focus();
    } else {
      setLoading(true);
      const user = {
        n: d.n,
        p: d.p,
      };
      const data = await login(user);
      if (data.user === undefined) {
        if (data !== 200 && data[0] !== "E")
          setPasswordError(languageState.texts.Login.Errors.WrongUser);
        else setPasswordError(languageState.texts.Login.Errors.NotConnected);
      } else {
        // taking from server
        // user
        const loginUser = new User();
        loginUser.setUser(data.user);
        // audio
        const audioConfig = new Config(data.audio);
        // graphic
        const graphicConfig = new Config(data.graphic);
        setContextState({
          type: "log-in",
          data: data.user,
        });
        setAudioConfigState({
          type: "set",
          data: data.audio,
        });
        setGraphicConfigState({
          type: "set",
          data: data.graphic,
        });
        if (!remember)
          SaveToStorage(false, {
            user: loginUser,
            audio: audioConfig,
            graphic: graphicConfig,
          });
        else
          SaveToStorage(true, {
            user: loginUser,
            audio: audioConfig,
            graphic: graphicConfig,
          });
      }
      setLoading(false);
    }
  };

  const toggleRemember = (e) => setRemember(!remember);

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  const play = (who) => {
    return setAudioControllerState({ type: `play-${who}` });
  };

  return (
    <div className="view">
      {loading ? <Loading type="backdrop" visible={loading} /> : <></>}
      <img
        src={main}
        alt="main-bg"
        className={graphicConfigState.animations ? "kenburns" : ""}
      />
      {!loading && graphicConfigState.animations ? <ShootingStars /> : <></>}
      {contextState.name === undefined ? (
        <form onSubmit={handleSubmit(signIn)} className="form">
          <img src={compass} alt="compass-bg" />
          <h3>{languageState.texts.Login.Title[0]}</h3>
          <h2>{languageState.texts.Login.Title[1]}</h2>
          <div className="row flex flex-column">
            <label htmlFor="user">
              {languageState.texts.Login.Labels.User}
            </label>
            <input
              id="user"
              placeholder={languageState.texts.Login.Placeholders.User}
              autoComplete="off"
              {...register("n")}
            />
            <label className="error" htmlFor="user">
              {userError}
            </label>
          </div>
          <div className="row flex flex-column">
            <label htmlFor="password">
              {languageState.texts.Login.Labels.Password}
            </label>
            <input
              id="password"
              placeholder={languageState.texts.Login.Placeholders.Password}
              type="password"
              {...register("p")}
            />
            <label className="error" htmlFor="password">
              {passwordError}
            </label>
          </div>
          <div className="row flex align-center">
            <Toggle
              className="toggle"
              id="remember"
              offRender={<></>}
              onRender={<></>}
              value={remember}
              onToggle={toggleRemember}
            />
            <label htmlFor="remember">
              {languageState.texts.Login.Labels.Remember}
            </label>
          </div>
          <div className="row flex">
            <button type="submit" className="primary">
              {languageState.texts.Login.Buttons.SignIn}
            </button>
            <button type="button" className="ghost">
              {languageState.texts.Login.Buttons.SignUp}
            </button>
          </div>
          <hr />
          <div className="row flex align-center">
            <Link
              to="/forgot"
              onClick={() => {
                if (audioConfigState.sfx) play("big-click");
              }}
            >
              {languageState.texts.Login.Buttons.Forgot}
            </Link>
          </div>
        </form>
      ) : (
        <Card className="welcome-card" animation="pop-up">
          <div className="flex justify-space-between">
            <div>
              <h3>{languageState.texts.Login.Labels.Welcome}</h3>
              <h1>{contextState.name}</h1>
            </div>
            <div>
              <img src={compass} className="dialog-stars" alt="stars" />
            </div>
          </div>
          <Link to="/home" className="primary btn" onClick={setUserPlaying}>
            {languageState.texts.Login.Buttons.Continue}
          </Link>
        </Card>
      )}
    </div>
  );
};

export default Login;
