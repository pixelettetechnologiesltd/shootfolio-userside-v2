import React from 'react'
import {Button} from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai";
const Menupopup = (props) => {
    return (props.trigger)?(
        <div className='popup'>
            <div className='popupinner'>
              <Button className="clodebuttonpopup" onClick={() => props.setTrigger(false)}><AiOutlineClose/></Button>
              {props.children}
            </div>
        </div>
      ):"";
    }

export default Menupopup