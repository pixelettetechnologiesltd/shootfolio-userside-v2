import React from 'react'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "../Css/Game/PortfolioHistory.css"
import { images } from '../../Images';
const PortfolioHistory = () => {
    return (
        <div>
            <Container className='mb-5'>
                {/* <Row className='mt-3'>
                    <Col md={4}>
                        <p className='headingforhistorytab'>Matches</p>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4}></Col>
                </Row> */}
                <Row className='mt-5'>
                    <Col md={12}>
                        <div className='rowhistorybackground'>
                            <Col md={3}>
                                <div className='makeimageshistoryinrow'>
                                    <div>
                                        <Image src={images.historyone} />
                                        <p className='historyclubname'>pico club</p>
                                    </div>
                                    <p className='colonfonthistory'>:</p>
                                    <div>
                                        <Image src={images.historytwo} />
                                        <p className='historyclubname'>MCN Vake</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <div>
                                    <p className='gametypeheadhistory'>Game Type</p>
                                    <p className='gametypehistory'>Realtime (Player vs Player)</p>
                                </div>
                            </Col>
                            <Col md={3} >
                                    <p className='gametypeheadhistory'>Portfolio Tokens</p>
                                    <Image src={images.clubassets}/>
                            </Col>
                            <Col md={2} className='putstathistorybuttonatend'>
                                <Button className='viewstatshistory'>View Game Stats</Button>
                            </Col>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={12}>
                        <div className='rowhistorybackground'>
                            <Col md={3}>
                                <div className='makeimageshistoryinrow'>
                                    <div>
                                        <Image src={images.historyone} />
                                        <p className='historyclubname'>pico club</p>
                                    </div>
                                    <p className='colonfonthistory'>:</p>
                                    <div>
                                        <Image src={images.historytwo} />
                                        <p className='historyclubname'>MCN Vake</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <div>
                                    <p className='gametypeheadhistory'>Game Type</p>
                                    <p className='gametypehistory'>Realtime (Player vs Player)</p>
                                </div>
                            </Col>
                            <Col md={3} >
                                    <p className='gametypeheadhistory'>Portfolio Tokens</p>
                                    <Image src={images.clubassets}/>
                            </Col>
                            <Col md={2} className='putstathistorybuttonatend'>
                                <Button className='viewstatshistory'>View Game Stats</Button>
                            </Col>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={12}>
                        <div className='rowhistorybackground'>
                            <Col md={3}>
                                <div className='makeimageshistoryinrow'>
                                    <div>
                                        <Image src={images.historyone} />
                                        <p className='historyclubname'>pico club</p>
                                    </div>
                                    <p className='colonfonthistory'>:</p>
                                    <div>
                                        <Image src={images.historytwo} />
                                        <p className='historyclubname'>MCN Vake</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <div>
                                    <p className='gametypeheadhistory'>Game Type</p>
                                    <p className='gametypehistory'>Realtime (Player vs Player)</p>
                                </div>
                            </Col>
                            <Col md={3} >
                                    <p className='gametypeheadhistory'>Portfolio Tokens</p>
                                    <Image src={images.clubassets}/>
                            </Col>
                            <Col md={2} className='putstathistorybuttonatend'>
                                <Button className='viewstatshistory'>View Game Stats</Button>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default PortfolioHistory