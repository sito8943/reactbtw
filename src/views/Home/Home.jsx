import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storageFunction } from "storage-function";

// images
import main from "../../img/bg/main.jpg";

// context
import { useContext } from "../../context/ContextProvider";
import { useGraphicConfig } from "../../context/GraphicConfig";

// utils

// models
import User from "../../models/User";

// components
import Loading from "../../components/Loading/Loading";
import ShootingStars from "../../components/ShootingStars/ShootingStars";

const Home = (props) => {
  const { texts } = props;
  const { contextState, setContextState } = useContext();
  const { graphicConfigState, setGraphicConfigState } = useGraphicConfig();
  const [loading, setLoading] = useState(true);

  const init = () => {};

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div className="view">
      {loading ? <Loading type="backdrop" visible={loading} /> : <></>}
      <img src={main} alt="main-bg" className={graphicConfigState.animations ? "kenburns" : ""} />
      {!loading && graphicConfigState.animations ? <ShootingStars /> : <></>}
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
    </div>
  );
};

export default Login;
