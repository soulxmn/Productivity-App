import React from "react";
import Next from "./Next.js";
import Prev from "./Previous.js";
import Pause from "./Pause.js";
import Play from "./Play.js";

const Controls = ({ isPlaying, onPlayClick, onPrevClick, onNextClick }) => (
  <div className="Controls">
    <button
      type="button"
      className="prev"
      onClick={onPrevClick}
      style={{ width: "50px", color: "#fff" }}
    >
      <Prev></Prev>
    </button>

      {isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => onPlayClick(false)}
          style={{ width: "50px", color: "#fff" }}
        >
          <Pause></Pause>
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => onPlayClick(true)}
          style={{ width: "50px", color: "#fff" }}
        >
          <Play></Play>
        </button>
      )}
    <button
      type="button"
      className="next"
      onClick={onNextClick}
      style={{ width: "50px", color: "#fff" }}
    >
      <Next></Next>
    </button>
  </div>
);

export default Controls;
