import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../Css/Game/Gamemode.css"
import Header from "../../Components/Header";
const Gamemode = () => {
    return (
        <div>
            <Header />
            <div className='gamemodebgcolor'>
                <Container>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <p className='selectgamemodeheading'>Select a Gameplay Mode</p>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Container>
                <div className="makescrolsecinmbl">
                    <Container className="fullcontainerwidthswt mt-5">
                        <Row className='stripmodebg marg-top-100-mode-game'>
                            <Col md={7} xs={5}>
                                <p className='gamemodetitle'>Idle (Player vs Machine)</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timetitlemode'>Time</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timeitselfmode'>7 Days</p>
                            </Col>
                            <Col md={3} xs={3}>
                                <div className='setmodebuttonend'>
                                    <Button className="selectmodesubmitbutton" href="/joinleague">Select</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='stripmodebg mt-3'>
                            <Col md={7} xs={5}>
                                <p className='gamemodetitle'>Idle (Player vs Player)</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timetitlemode'>Time</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timeitselfmode'>7 Days</p>
                            </Col>
                            <Col md={3} xs={3}>
                                <div className='setmodebuttonend'>
                                    <Button className="selectmodesubmitbutton" href="/joinleague">Select</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='stripmodebg mt-3'>
                            <Col md={7} xs={5}>
                                <p className='gamemodetitle'>Realtime (Player vs Player)</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timetitlemode'>Time</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timeitselfmode'>90 Mins</p>
                            </Col>
                            <Col md={3} xs={3}>
                                <div className='setmodebuttonend'>
                                    <Button className="selectmodesubmitbutton" href="/joinleague">Select</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='stripmodebg mt-3'>
                            <Col md={7} xs={5}>
                                <p className='gamemodetitle'>Multiplayer Realtime (5 Player vs 5 Player)</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timetitlemode'>Time</p>
                            </Col>
                            <Col md={1} xs={2}>
                                <p className='timeitselfmode'>90 Mins</p>
                            </Col>
                            <Col md={3} xs={3}>
                                <div className='setmodebuttonend'>
                                    <Button className="selectmodesubmitbutton" href="/joinleague">Select</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Gamemode