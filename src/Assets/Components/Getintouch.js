import React from 'react'
import { Container, Row, Col, } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone} from "react-icons/bs";
import Form from "../Components/Form"

import "../Css/Getintouch.css"
const Getintouch = () => {
  return (
    <div className='getintouchbgcolor'>
        <Container>
            <Row>
                <Col md={6}>
                    <p className="getinhead">Get in touch <br></br>with us</p>
                    <p className="getindesc">Yet bed any for travelling assistance <br></br>indulgence unpleasing.</p>
                    <p className="reachout mt-5">Reach out to us at</p>
                    <div className='justifyformrow'>
                        <div className='makelogoandtextinrow'>
                        <span className='mailogoform'><AiOutlineMail/></span> <p className='formmail'>support@shootfolio.com</p>
                        </div>
                        <div className='makelogoandtextinrow'>
                        <span className='mailogoform margin-leftform'><BsTelephone/></span><p className='formmail'>+1 234 567 890</p>
                        </div>
                    </div>
                </Col>
                <Col md={5}>
                    <Form/>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Getintouch