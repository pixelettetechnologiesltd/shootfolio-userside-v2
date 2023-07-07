import React from 'react'
import "../Css/Footer.css"
import { Container, Row, Col, Image} from "react-bootstrap";
import { images } from "../../Images";
const Footer = () => {
  return (
    <div className='footerbgblack'>
        <Container>
            <Row>
                <Col md={6}>
                    <a className="removelinefromlogo" href='/'><p className='footerlogo'>Shootfolio</p></a>
                    <p className='footercontacthead'>CONTACT</p>
                    <a className="removelinefromlogo" href='mailto:'><p className='footeremail'>support@shootfolio.com</p></a>
                </Col>
                <Col md={2}>
                {/* <p className='footheadlist'>Resources</p>
                    <div className='makefooteroptiocolumn'>
                    <a className='footlist'>Blog</a>
                    <a className='footlist'>Product Updates</a>
                    </div> */}
                </Col>
                <Col md={2}>
                    <p className='footheadlist'>Navigation</p>
                    <div className='makefooteroptiocolumn'>
                    <a className='footlist' href="/">Home</a>
                    <a className='footlist' href="/about">About</a>
                    <a className='footlist' href="/contact">Contact</a>
                    </div>
                </Col>
                <Col md={2}>
                    <p className='footheadlist'>Stay up to date</p>
                    <p className='footlist mt-4'>Stay Informed On How You Can Make a Difference</p>
                    <div className='socialfootspacebetween'>
                        <Image className='mblwidthicon' src={images.footone} width="20%"/>
                        <Image className='mblwidthicon' src={images.foottwo} width="20%"/>
                        <Image className='mblwidthicon' src={images.footthree} width="20%"/>
                        <Image className='mblwidthicon' src={images.footfour} width="20%"/>
                    </div>
                </Col>
            </Row>
        </Container>
        <Container>
        <Row className='bodertop mt-5'>
                <p className='copywrite'>© 2023 All Rights Reserved -  Pixelette Technologies</p>
            </Row>
        </Container>
    </div>
  )
}

export default Footer