import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../Css/Game/Joinleague.css"
import Header from "../../Components/Header";
const Joinleague = () => {
    return (
        <div>
            <Header />
            <div className='setjoinleaguepadding'>
                <Container>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6} className='makeradiocenter'>
                            <p className='joinleagueheading'>Join the Exciting League</p>
                            <p className='joinleaguedescriptionhead'>Compete with the Best in the Crypto World</p>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md={1}></Col>
                        <Col md={10} className='makeleaguescenterincolten'>
                            <Col md={4}>
                                <div className='leaguebg'>
                                    <p className='leaguetitle'>Crypto Amateur Learners<br></br> League</p>
                                    <div className='leaguecategory mt-3'>
                                        <p className='categorytitleleague'>Category</p>
                                        <p className='leaguecategoryitself'>Amateur</p>
                                    </div>
                                    <div className='leaguecategory mt-3'>
                                        <p className='categorytitleleague'>Funds</p>
                                        <p className='leaguecategoryitself'>$10,000</p>
                                    </div>
                                    <Button className='selectleaguebutton mt-2' href="/portfoliocreation">Select</Button>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='leaguebg'>
                                    <p className='leaguetitle'>Crypto Amateur Learners<br></br> League</p>
                                    <div className='leaguecategory mt-3'>
                                        <p className='categorytitleleague'>Category</p>
                                        <p className='leaguecategoryitself'>Amateur</p>
                                    </div>
                                    <div className='leaguecategory mt-3'>
                                        <p className='categorytitleleague'>Funds</p>
                                        <p className='leaguecategoryitself'>$10,000</p>
                                    </div>
                                    <Button className='selectleaguebutton mt-2' href="/portfoliocreation">Select</Button>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='leaguebg'>
                                    <p className='leaguetitle'>Crypto Amateur Learners<br></br> League</p>
                                    <div className='leaguecategory mt-3'>
                                        <p className='categorytitleleague'>Category</p>
                                        <p className='leaguecategoryitself'>Amateur</p>
                                    </div>
                                    <div className='leaguecategory mt-3'>
                                        <p className='categorytitleleague'>Funds</p>
                                        <p className='leaguecategoryitself'>$10,000</p>
                                    </div>
                                    <Button className='selectleaguebutton mt-2' href="/portfoliocreation">Select</Button>
                                </div>
                            </Col>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                        <p className='joinleaguedescriptionhead mt-5'>Please note that players without a subscription cannot join the Crypto Super League and Crypto Expert League.</p>
                            <div className='makeleaguebottombutcent mt-5'>
                                <Button className='underjoinleaguebutton'>Crypto Super League </Button>
                                <Button className='underjoinleaguebutton margtopleaguembl'>Crypto Expert League </Button>
                            </div>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Joinleague