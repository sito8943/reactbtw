import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { storageFunction } from "storage-function";
import { base64encode } from "nodejs-base64";

// 3rd libs
import ToggleButton from "react-toggle-button";

// images
import main from "../../img/bg/main.jpg";

// context
import { useContext } from "../../context/ContextProvider";

// utils
import { login } from "../../services/post";

// models
import User from "../../models/User";

// components
import Loading from "../../components/Loading/Loading";
import ShootingStars from "../../components/ShootingStars/ShootingStars";
import Toggle from "../../components/Toggle/Toggle";

const Login = (props) => {
  const { texts } = props;
  const { register, handleSubmit } = useForm();
  const { contextState, setContextState } = useContext();
  const [remember, setRemember] = useState(false);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(true);

  const init = async () => {};

  const signIn = async (d) => {
    setLoading(true);
    const user = {
      n: d.n,
      p: d.p,
    };
    const data = await login(user);
    if (data !== "1") {
      if (data !== 200 && data[0] !== "E") setUserError(texts.Errors.WrongUser);
      else setUserError(texts.Errors.NotConnected);
    } else {
      const loginUser = new User(base64encode(user.n), user.n);
      setContextState({
        type: "log-in",
        user: loginUser,
      });
      if (d.remember === "false")
        storageFunction.toLocalStorage("user", user.n);
      else storageFunction.toSessionStorage("user", user.n);
    }
    setLoading(false);
  };

  const toggleRemember = (e) => setRemember(!remember);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="view">
      {loading ? <Loading type="backdrop" visible={loading} /> : <></>}
      <form onSubmit={handleSubmit(signIn)} className="form">
		<h3>{}</h3>
        <div className="row flex flex-column">
          <label htmlFor="user">{texts.Labels.User}</label>
          <input
            id="user"
            placeholder={texts.Placeholders.User}
            autoComplete="off"
            {...register("n")}
          />
          <label htmlFor="user">{userError}</label>
        </div>
        <div className="row flex flex-column">
          <label htmlFor="password">{texts.Labels.Password}</label>
          <input
            id="password"
            placeholder={texts.Placeholders.Password}
            type="password"
            {...register("p")}
          />
          <label htmlFor="password">{passwordError}</label>
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
      </form>
    </div>
  );
};

export default Login;
