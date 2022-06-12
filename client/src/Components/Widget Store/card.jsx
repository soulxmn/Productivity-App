import { cardActionsClasses } from "@mui/material";
import { useState } from "react";
import "./cardstyles.css";
import { Button, Switch } from "@mui/material";

const Card = ({
  Widgetname,
  Widgetimg,
  Buttontext,
  Buttoncolor,
  localStoreName,
}) => {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem(localStoreName)) === null
      ? false
      : JSON.parse(localStorage.getItem(localStoreName))
  );

  const addWidget = () => {
    setChecked(!JSON.parse(localStorage.getItem(localStoreName)));
    localStorage.setItem(
      localStoreName,
      !JSON.parse(localStorage.getItem(localStoreName))
    );
  };

  return (
    <div className="Box">
      <div className="Card">
        <img className="image" src={Widgetimg} />
        <h2 className="widgetname">{Widgetname}</h2>
        <div className="Select">
          <Button
            className="WidgetSelected"
            style={
              JSON.parse(localStorage.getItem(localStoreName)) === true
                ? { backgroundColor: "red", color: "white" }
                : { backgroundColor: "green", color: "white" }
            }
            onClick={addWidget}
          >
            {JSON.parse(localStorage.getItem(localStoreName)) === true
              ? "Remove Widget"
              : "Add Widget"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
