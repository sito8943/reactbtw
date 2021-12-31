import React, { useEffect } from "react";

// context
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";

// sfx
import spaceAudio from "../../audio/sfx/space3.mp3";
import popUpAudio from "../../audio/sfx/popUp.mp3";
import bigClickAudio from "../../audio/sfx/bigClick.mp3";

// controllers
const popUp = new Audio(popUpAudio);
const bigClick = new Audio(bigClickAudio);
const space = new Audio(spaceAudio);

const AudioController = () => {

	const { audioConfigState } = useAudioConfig();
	const { audioControllerState, setAudioControllerState } = useAudioController();

	useEffect(() => {
		console.log("hola");
		if (audioConfigState.sfx) {
			popUp.load();
			bigClick.load();
			space.load();
		}
	}, []);

	useEffect(() => {
		if (audioControllerState.popUp) { 
			console.log("cambia");
			popUp.play();
			//setAudioControllerState({ type: "stop", who: "pop-up" });
		}
	}, [audioControllerState, audioConfigState]);


	return <></>
}

export default AudioController;