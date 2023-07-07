import React from 'react'
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../Css/Contact.css"
import { images } from "../../Images";
import Form from "react-bootstrap/Form";
import { BsTelephone } from "react-icons/bs";
import { TfiEmail} from "react-icons/tfi";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
const Contact = () => {
  return (
    <div>
        <Header/>
        <div className='contactbg'>
            <Container className='contactcontainerbg'>
                <Row>
                    <Col md={6}>
                        <p className='getintouchhead'>Get in Touch</p>
                        <p className='getintouchdesc'>We are here for you, How can we help?</p>

                        <Form className="mt-5">
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="makefieldgightmore contactformfieldbg"
            type="text"
            placeholder="Full Name"
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="makefieldgightmore contactformfieldbg"
            type="text"
            placeholder="User Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control className='contactformfieldbg' as="textarea" rows={3} placeholder="Message..."/>
      </Form.Group>
        <div className="makesignupbtncenter">
          <button className="formsubmitbutton" type="submit">
            Submit
          </button>
        </div>
      </Form>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={4}>
                        <p className='getintouchhead marg-mb-top-contact'>Reach out to us at</p>
                        <div className='contactmakelogotextinrow'>
                            <span className='contactemaillogo'><TfiEmail/></span>
                            <p className='contactpageemail'>support@shootfolio.com</p>
                        </div>
                        <div className='contactmakelogotextinrow'>
                            <span className='contactemaillogo'><BsTelephone/></span>
                            <p className='contactpageemail'>+1 234 567 890</p>
                        </div>
                        <Image className='mt-5' src={images.contvector} width="100%"/>
                        
                    </Col>
                </Row>
            </Container>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact