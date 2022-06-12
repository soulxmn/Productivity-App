import React from "react";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import "./App.css";
import PlayButton from "./PlayButton";
import { Box } from "@mui/material";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import "./CountdownTimer.css";

const red = "#f54e4e";
const green = "#4aec8c";

//shows the whole circular clock counting down, with a play/pause button to start and stop the time and settings button to go adjust work/break times.
// We use React Hooks to make transfer of information easier

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPause, setPause] = useState(true);
  const [mode, setmode] = useState("work");
  const [seconds, setseconds] = useState(0);

  const secondsRef = useRef(seconds);
  const isPauseRef = useRef(isPause);
  const modeRef = useRef(mode);

  function tick() {
    secondsRef.current--;
    setseconds(secondsRef.current);
  }

  function initTimer() {
    setseconds(settingsInfo.workMinutes * 60);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      setmode(nextMode);
      modeRef.current = nextMode;

      const nextsec =
        nextMode === "work"
          ? settingsInfo.workMinutes * 60
          : settingsInfo.breakMinutes * 60;
      setseconds(nextsec);
      secondsRef.current = nextsec;
    }
    secondsRef.current = settingsInfo.workMinutes * 60;
    setseconds(secondsRef.current);

    //initTimer();
    const interval = setInterval(() => {
      if (isPauseRef.current) {
        return;
      }
      if (secondsRef.current === 0) {
        switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const total =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((seconds / total) * 100);

  const minutes = Math.floor(seconds / 60);
  let sec = seconds % 60;
  if (sec < 10) sec = "0" + sec;

  return (
    <div className="countdowntimer">
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + sec}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          width: "200px",
          tailColor: "rgba(255,255,255,.2)",
        })}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "20px" }}>
          {isPause ? (
            <PlayButton
              className="timer"
              onClick={() => {
                setPause(false);
                isPauseRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              className="timer"
              onClick={() => {
                setPause(true);
                isPauseRef.current = true;
              }}
            />
          )}
        </div>
        <div style={{ marginTop: "20px" }}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
      </Box>
    </div>
  );
}

export default Timer;
