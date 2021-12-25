import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { storageFunction } from 'storage-function';
import { base64encode } from "nodejs-base64";

// context
import { useContext } from "../../context/ContextProvider";

// utils
import { login } from "../../services/post";

// models
import User from "../../models/User";

// components
import Loading from "../../components/Loading/Loading";

const Login = (props) => {
	
	const { texts } = props;
	const { register, handleSubmit } = useForm();
	const { contextState, setContextState } = useContext();
	const [ error, setError ] = useState("");
	const [ loading, setLoading ] = useState(true);

	const init = async () => {

	};

	const sigIn = async (d) => {
		setLoading(true);
		const user = {
			n: d.n,
			p: d.p,
		};
		const data = await login(user);
		if (data !== "1") {
			if (data !== 200 && data[0] !== "E") setError(texts.Errors.WrongUser);
			else setError(texts.Errors.NotConnected);
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
		// setLoading(false);
	}, []);

	return (
		<div>
			{loading ? <Loading type="backdrop" /> : <></>}
		</div>
	)

}

export default Login;