import React from 'react'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Header from "../Components/Header";
import "../Css/Game/Playgame.css";
const EmailVerification = () => {
    return (
        <div>
            <Header />
            <div className="exploringgamesectionbg">
                <Container>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4} className='makeverificationthingscenter'>
                            <p className="Exploringheading">Verification</p>
                            <p className="selectgamemodedesc">Please check your email to verify your account</p>
                            <Button className="Freetoplaybutton mt-3" href="/signin">
                                Login
                            </Button>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default EmailVerification