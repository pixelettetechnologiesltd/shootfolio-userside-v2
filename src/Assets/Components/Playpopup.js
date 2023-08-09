import React from "react";
import { Button } from "react-bootstrap";
import "../Css/Game/playpopup.css";
import { AiOutlineClose } from "react-icons/ai";
const Playpopup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popupinnerplay">
        <Button
          disabled={props.disabled}
          className="clodebuttonpopup"
          onClick={() => props.setTrigger(false)}
        >
          <AiOutlineClose />
        </Button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Playpopup;
