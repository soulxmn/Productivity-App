import { useEffect, useState, useRef } from "react";
import "./player.css";
import Controls from "./Controls";
import React, { Component }  from 'react';

const Player = ({ songs }) => {
  const [Playing, setPlaying] = useState(false);
  const [Trackno, setTrackno] = useState(0);

  const { song, artist, image, audio } = songs[Trackno]; //getting different elements of the song

  const songRef = useRef(new Audio(audio));

  const Previoussong = () => {
    if (Trackno - 1 < 0) {
      setTrackno(songs.length - 1);
    } else {
      setTrackno(Trackno - 1);
    }
  };

  const NextSong = () => {
    if (Trackno + 1 === songs.length) {
      setTrackno(0);
    } else {
      setTrackno(Trackno + 1);
    }
  };

  //To pause or play audio
  useEffect(() => {
    if (Playing) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }, [Playing]);

  //effect when the trackNo changes
  useEffect(() => {
    songRef.current.pause();
    songRef.current = new Audio(audio);
    songRef.current.play();
    setPlaying(true);
  }, [Trackno, audio]);

  return (
    <div className="player">
      <div className="Song">
        <img className="Image" src={image}></img>
        <h2 className="SongTitle">{song}</h2>
        <h2 className="Artist">{artist}</h2>
        <Controls
          isPlaying={Playing}
          onPlayClick={setPlaying}
          onNextClick={NextSong}
          onPrevClick={Previoussong}
        ></Controls>
      </div>
    </div>
  );
};

export default Player;
