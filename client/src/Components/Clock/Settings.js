import { useContext, useState } from "react";
import React from "react";
import ReactSlider from "react-slider";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton.js";
import "./CountdownTimer.css";
import "./slider.css";
// Shows the Settings, with sliders to adjust the work and break minutes. We use react Hooks to make transfer of information easier
function Settings() {
  const info = useContext(SettingsContext);

  return (
    <div styles={{ textAlign: "left" }}>
      <label style = {{color:"white"}}>work minutes: {info.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={info.workMinutes}
        onChange={(newValue) => info.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />

      <label style = {{color:"white"}}>break minutes: {info.breakMinutes}:00</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={info.breakMinutes}
        onChange={(newValue) => info.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />

      <div style={{ marginTop: "20px" }}>
        <BackButton onClick={() => info.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
