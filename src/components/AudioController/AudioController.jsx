import React, { useEffect } from "react";

// context
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";

// sfx
import spaceAudio from "../../audio/sfx/space3.mp3";
import popUpAudio from "../../audio/sfx/ui6.mp3";
import bigClickAudio from "../../audio/sfx/bigClick.mp3";
import clickAudio from "../../audio/sfx/ui5.mp3";
import creationAudio from "../../audio/bfx/creationgood.mp3";

// controllers
const popUp = new Audio(popUpAudio);
const bigClick = new Audio(bigClickAudio);
const normalClick = new Audio(clickAudio);
const space = new Audio(spaceAudio);
const creation = new Audio(creationAudio);
creation.loop = true;

const AudioController = () => {
  const { audioConfigState } = useAudioConfig();
  const { audioControllerState } = useAudioController();

  useEffect(() => {
    if (audioConfigState.sfx) {
      popUp.load();
      bigClick.load();
      space.load();
      normalClick.load();
    }
    if (audioConfigState.bfx) {
      creation.load();
    }
  }, [audioConfigState]);

  useEffect(() => {
    if (audioControllerState.popUp) {
      popUp.currentTime = 0;
      popUp.play();
    }
  }, [audioControllerState.popUp]);

  useEffect(() => {
    if (audioControllerState.bigClick) {
      bigClick.currentTime = 0;
      bigClick.play();
    }
  }, [audioControllerState.bigClick]);

  useEffect(() => {
    if (audioControllerState.normalClick) {
      normalClick.currentTime = 0;
      normalClick.play();
    }
  }, [audioControllerState.normalClick]);

  useEffect(() => {
    if (audioControllerState.space) {
      space.currentTime = 0;
      space.play();
    }
  }, [audioControllerState.space]);

  useEffect(() => {
    if (audioControllerState.creation) {
      creation.currentTime = 0;
      creation.play();
    }
  }, [audioControllerState.creation]);

  return <></>;
};

export default AudioController;
