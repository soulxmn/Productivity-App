import { cardActionsClasses } from "@mui/material";
import "./cardstyles.css"


const Lcard  = ({ Widgetname, Widgetimg, Buttontext, Buttoncolor}) => (
    <div className="Box">
        <div className="LCard">
        <img className="image" src = {Widgetimg}  />
        <h2 className="widgetname">{Widgetname}</h2>
    </div>
    </div>
    
);

export default Lcard;