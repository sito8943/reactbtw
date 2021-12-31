import React from "react";

// context
import { useAudioConfig } from "../../context/AudioConfig";

// sfx
import spaceAudio from "../../audio/sfx/space3.mp3";
import popUpAudio from "../../audio/sfx/popUp.mp3";
import bigClickAudio from "../../audio/sfx/bigClick.mp3";

const AudioController = () => {

	const { audioConfigState } = useAudioConfig();

	// controllers
	const popUp = new Audio(popUpAudio);
	const bigClick = new Audio(bigClickAudio);
	const space = new Audio(spaceAudio);

}

export default AudioController;