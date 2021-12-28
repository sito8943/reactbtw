import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { storageFunction } from "storage-function";
import { base64encode } from "nodejs-base64";

// images
import main from "../../img/bg/main.jpg";
import compass from "../../img/compass.svg";

// context
import { useContext } from "../../context/ContextProvider";
import { useGraphicConfig } from "../../context/GraphicConfig";

// utils
import { login } from "../../services/post";

// models
import User from "../../models/User";

// components
import Loading from "../../components/Loading/Loading";
import ShootingStars from "../../components/ShootingStars/ShootingStars";
import Toggle from "../../components/Toggle/Toggle";
import Card from "../../components/Card/Card";

const Login = (props) => {
  const { texts } = props;
  const { register, handleSubmit } = useForm();
  const { contextState, setContextState } = useContext();
  const { graphicConfigState, setGraphicConfigState } = useGraphicConfig();
  const [remember, setRemember] = useState(false);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(true);

  const init = () => {};

  const signIn = async (d) => {
    setUserError("");
    setPasswordError("");
    if (d.n === "") {
      setUserError(texts.Errors.EmptyUser);
      document.getElementById("user").focus();
    } else if (d.p === "") {
      setPasswordError(texts.Errors.EmptyPassword);
      document.getElementById("password").focus();
    } else {
      setLoading(true);
      const user = {
        n: d.n,
        p: d.p,
      };
      const data = await login(user);
      if (data !== "1") {
        if (data !== 200 && data[0] !== "E") setPasswordError(texts.Errors.WrongUser);
        else setPasswordError(texts.Errors.NotConnected);
      } else {
        const loginUser = new User(base64encode(user.n), user.n);
        setContextState({
          type: "log-in",
          user: loginUser,
        });
        if (!remember)
          storageFunction.toLocalStorage("user", user.n);
        else storageFunction.toSessionStorage("user", user.n);
      }
      setLoading(false);
    }
  };

  const toggleRemember = (e) => setRemember(!remember);

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div className="view">
      {loading ? <Loading type="backdrop" visible={loading} /> : <></>}
      <img src={main} alt="main-bg" className={graphicConfigState.animations ? "kenburns" : ""} />
      {!loading && graphicConfigState.animations ? <ShootingStars /> : <></>}
      {contextState.user.Name === undefined ? (
        <form onSubmit={handleSubmit(signIn)} className="form">
          <img src={compass} alt="compass-bg" />
          <h3>{texts.Title[0]}</h3>
          <h2>{texts.Title[1]}</h2>
          <div className="row flex flex-column">
            <label htmlFor="user">{texts.Labels.User}</label>
            <input
              id="user"
              placeholder={texts.Placeholders.User}
              autoComplete="off"
              {...register("n")}
            />
            <label className="error" htmlFor="user">{userError}</label>
          </div>
          <div className="row flex flex-column">
            <label htmlFor="password">{texts.Labels.Password}</label>
            <input
              id="password"
              placeholder={texts.Placeholders.Password}
              type="password"
              {...register("p")}
            />
            <label className="error" htmlFor="password">{passwordError}</label>
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
            <label htmlFor="remember">{texts.Labels.Remember}</label>
          </div>
          <div className="row flex">
            <button type="submit" className="primary">{texts.Buttons.SignIn}</button>
            <button type="button" className="ghost">{texts.Buttons.SignUp}</button>
          </div>
          <hr/>
          <div className="row flex align-center">
            <Link to="/forgot">{texts.Buttons.Forgot}</Link>
          </div>
        </form>
      ) : (
        <Card className="welcome-card">
          <div>
            <h3>{texts.Labels.Welcome}</h3>
            <h1>{contextState.user.Name}</h1>
          </div>
          <button className="primary">{texts.Buttons.Continue}</button>
        </Card>
      )}
    </div>
  );
};

export default Login;
