import Card from "./card.jsx";
import { useState } from "react";
import Lcard from "./lockedcard.jsx";
import musicimg from "./MusicPlayerLogo.jfif";
import statsimg from "./logo.png";
import treeimg from "./tree.png";
import "./widgetstore.css";

const Widgetstore = () => {
  return (
    <div>
      <div className="Title">
        <h1 className="Storename">Widget Store</h1>{" "}
      </div>
      <div className="Store">
        <Card
          Widgetname="Music Player"
          Widgetimg={musicimg}
          Buttontext="Select"
          Buttoncolor="#00FF00"
          localStoreName="musicWidget"
        ></Card>

        <Lcard
          Widgetname="Statistics"
          Widgetimg={statsimg}
          Buttontext="Locked"
          Buttoncolor="#00FF00"
        ></Lcard>

        <Card
          Widgetname="Progress Forest"
          Widgetimg={treeimg}
          Buttontext="Select"
          Buttoncolor="#00FF00"
          localStoreName="forestWidget"
        ></Card>
      </div>
    </div>
  );
};

export default Widgetstore;
