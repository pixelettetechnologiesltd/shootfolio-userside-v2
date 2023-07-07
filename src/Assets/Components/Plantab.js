import React from 'react'
import "../Css/Game/Plantab.css"
import { images } from "../../Images";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
const Plantab = () => {
    return (
        <div>
            <Container>
                <Row className='margtopsetduemargneg'>
                    <Col md={4}>
                        <div className='plancardbg'>
                            <div className="makeplanimgtexinrow">
                                <div>
                                    <Image src={images.plan} width="70px" />
                                </div>
                                <div className='makebothlinetextincolumnplan'>
                                    <p className='planname'>Silver plan</p>
                                    <p className='planprice'>Free</p>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>50 Positions</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>Max 5 selected coins</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>Exchange arbitrage</p>
                            </div>
                            <div className='makebuttonfullwidthplan'>
                                <Button className='mt-4 chooseplanbtn'>Choose Plan <span className='margsetrightarrow'><BsArrowRight/></span></Button>
                            </div>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className='plancardbgblack'>
                            <div className="makeplanimgtexinrow">
                                <div>
                                    <Image src={images.plan} width="70px" />
                                </div>
                                <div className='makebothlinetextincolumnplan'>
                                    <p className='planname'>Golden plan</p>
                                    <p className='planprice'>$100 pr month</p>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>50 Positions</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>Max 10 selected coins</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>Exchange arbitrage</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>TA with 10 min interval</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>Paper trading</p>
                            </div>
                            <div className='makebuttonfullwidthplan'>
                                <Button className='mt-4 chooseplanbtn'>Choose Plan <span className='margsetrightarrow'><BsArrowRight/></span></Button>
                            </div>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className='plancardbg'>
                            <div className="makeplanimgtexinrow">
                                <div>
                                    <Image src={images.plan} width="70px" />
                                </div>
                                <div className='makebothlinetextincolumnplan'>
                                    <p className='planname'>Platinum plan</p>
                                    <p className='planprice'>$200 pr month</p>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>1000 Positions</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>Max 15 selected coins</p>
                            </div>
                            <div className='mt-4'>
                                <p className='planadvantage'><span className='planadvantagearrow'><BiCheck/></span>All access to game features</p>
                            </div>
                            <div className='makebuttonfullwidthplan'>
                                <Button className='mt-4 chooseplanbtn'>Choose Plan <span className='margsetrightarrow'><BsArrowRight/></span></Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Plantab