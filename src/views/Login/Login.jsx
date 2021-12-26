import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { storageFunction } from 'storage-function';
import { base64encode } from "nodejs-base64";

// fluent
import { TextField, ITextFieldStyles, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Stack } from '@fluentui/react/lib/Stack';
import { useBoolean } from '@fluentui/react-hooks';

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

const Login = (props) => {
	
	const { texts } = props;
	const { register, handleSubmit } = useForm();
	const { contextState, setContextState } = useContext();
	const [ remember, { toggle: toggleRemember }] = useBoolean(false);
	const [ userError, setUserError ] = useState("");
	const [ passwordError, setPasswordError ] = useState("");
	const [ loading, setLoading ] = useState(true);

	const init = async () => {

	};

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
			if (d.remember === "false") storageFunction.toLocalStorage("user", user.n);
			else storageFunction.toSessionStorage("user", user.n);
		}
		setLoading(false);
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="view">
			<img sry={main} alt="space" />
			{loading ? <Loading type="backdrop" visible={loading} /> : <></>}
			<ShootingStars />
			<form onSubmit={handleSubmit(signIn)} className="form">
				<TextField 
					label={texts.Labels.User}
					placeholder={texts.Placeholders.User}
					errorMessage={userError} 
					{...register("user")} 
				/>
				<TextField
		          label={texts.Labels.Password}
		          placeholder={texts.Placeholders.Password}
		          type="password"
		          canRevealPassword
		          revealPasswordAriaLabel={texts.Labels.ShowPassword}
		        />
		        <Toggle 
		        	label={texts.Labels.Remember}
		        	inlineLabel 
		        	checked={remember} 
		        	onChange={toggleRemember} 
		        />
			</form>
		</div>
	)

}

export default Login;