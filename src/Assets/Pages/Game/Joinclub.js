import React from "react";
import Header from "../../Components/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { images } from "../../../Images"
import "../../Css/Game/Joinclub.css";
const Joinclub = () => {
    return (
        <div>
            <Header />
            <div className="joinclubaddpadding">
                <Container>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <p className="joiclubheadingtop">Join Club</p>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
                <div className="mt-5 makescrolsecinmbl">
                    <Container className="makedisplayyinblock">
                        <Row>
                            <Col md={12} className="makeinrowtitlesjoinleague">
                                <Col md={3} xs={3}>
                                    <p className="joinleaguetitles">Scarcity</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="joinleaguetitles">Paucity</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="joinleaguetitles">User Name</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="joinleaguetitles">Assets</p>
                                </Col>
                            </Col>
                            
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="joinclubsinglebg">
                                <Col md={3} xs={3}>
                                    <div className="scarcityimgandtext">
                                        <Image src={images.clubone} />
                                        <p className="clubname">CT-Levski Sofia</p>
                                    </div>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Common</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Cristiano Ronaldo</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <Image src={images.clubassets} width="55%" />
                                </Col>
                                <Col md={3} xs={3}>
                                    <div className="makebuttonendbeat">
                                        <Button className="beatclubbutton" href="play">Beat Club</Button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="joinclubsinglebg">
                                <Col md={3} xs={3}>
                                    <div className="scarcityimgandtext">
                                        <Image src={images.clubtwo} />
                                        <p className="clubname">Levski Sofia</p>
                                    </div>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Limited</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Cristiano Ronaldo</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <Image src={images.clubassets} width="55%" />
                                </Col>
                                <Col md={3} xs={3}>
                                    <div className="makebuttonendbeat">
                                        <Button className="beatclubbutton"href="play">Beat Club</Button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="joinclubsinglebg">
                                <Col md={3} xs={3}>
                                    <div className="scarcityimgandtext">
                                        <Image src={images.clubone} />
                                        <p className="clubname">CT-Levski Sofia</p>
                                    </div>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Common</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Cristiano Ronaldo</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <Image src={images.clubassets} width="55%" />
                                </Col>
                                <Col md={3} xs={3}>
                                    <div className="makebuttonendbeat">
                                        <Button className="beatclubbutton"href="play">Beat Club</Button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="joinclubsinglebg">
                                <Col md={3} xs={3}>
                                    <div className="scarcityimgandtext">
                                        <Image src={images.clubtwo} />
                                        <p className="clubname">Levski Sofia</p>
                                    </div>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Limited</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Cristiano Ronaldo</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <Image src={images.clubassets} width="55%" />
                                </Col>
                                <Col md={3} xs={3}>
                                    <div className="makebuttonendbeat">
                                        <Button className="beatclubbutton"href="play">Beat Club</Button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="joinclubsinglebg">
                                <Col md={3} xs={3}>
                                    <div className="scarcityimgandtext">
                                        <Image src={images.clubtwo} />
                                        <p className="clubname">Levski Sofia</p>
                                    </div>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Limited</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <p className="paucityvalue">Cristiano Ronaldo</p>
                                </Col>
                                <Col md={2} xs={2}>
                                    <Image src={images.clubassets} width="55%" />
                                </Col>
                                <Col md={3} xs={3}>
                                    <div className="makebuttonendbeat">
                                        <Button className="beatclubbutton"href="play">Beat Club</Button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
           
        </div>
    );
};

export default Joinclub;
