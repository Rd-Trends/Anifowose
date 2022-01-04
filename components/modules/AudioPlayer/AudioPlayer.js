import React, { useState } from "react";
import { Button } from "../../elements/Button/index";
import {
  BiRightArrow,
  BiLeftArrow,
  BiPlayCircle,
  BiPauseCircle,
} from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import Styles from "../../../styles/AudioPlayer.module.css";
import buttonStyles from "../../../styles/Button.module.css";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className={Styles.audioPlayer}>
      <audio></audio>

      <Button className={buttonStyles.btn_iconBtn}>
        <BiLeftArrow />
      </Button>
      <Button
        handleClick={togglePlayPause}
        className={buttonStyles.btn_iconBtn}
      >
        {isPlaying ? <BiPauseCircle /> : <BiPlayCircle />}
      </Button>
      <Button className={buttonStyles.btn_iconBtn}>
        <BiRightArrow />
      </Button>

      {/* current time */}
      <div>0:00</div>

      {/* progress */}
      <div>
        <input type="range" className={Styles.progressBar} />
      </div>

      {/* duration */}
      <div>3:00</div>
    </div>
  );
};

export default AudioPlayer;
