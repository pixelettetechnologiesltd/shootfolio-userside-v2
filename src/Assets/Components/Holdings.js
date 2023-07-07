import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../Css/Holdings.css";
import { images } from "../../Images";
import ProgressBar from "react-bootstrap/ProgressBar";
const Holdings = () => {
    return (
        <div className="makescrolsecinmbl">
            <Container className="holdingsbgblack mt-5">
                <Row>
                    <Col md={12} className="allcomponentsofholding">
                        <Col md={2} xs={2}>
                            <p className="mainheadingsofholding">Top Holdings</p>
                        </Col>
                        <Col md={2} xs={2} className="marg-left-mbl">
                            <p className="mainheadingsofholding">Assets</p>
                        </Col>
                        <Col md={3} xs={3}>
                            <p className="mainheadingsofholding makecentrightonmbl">Allocation</p>
                        </Col>
                        <Col md={2} xs={2} >
                            <p className="mainheadingsofholding makecentrightonmblremovemargin">Status</p>
                        </Col>
                        <Col md={2} xs={2}>
                            <p className="mainheadingsofholding marg-leftmin">Date</p>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-3 makeholdingsinlinewithborder">
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingone} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingtwo} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={3} xs={3}>
                            <div className="mt-1">
                                <ProgressBar className="setprogresscolors" now={70} variant="success" label={`${70}%`} />
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="statussetseparate">
                                <div className="statuscolorcircle"></div>
                                <p className="profilenameholding">status</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                <p className="profilenameholding">June 8, 2021</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-3 makeholdingsinlinewithborder">
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingthree} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingtwo} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={3} xs={3}>
                            <div className="mt-1">
                                <ProgressBar className="setprogresscolors" now={50} variant="success" label={`${50}%`} />
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="statussetseparate">
                                <div className="statuscolorcircle"></div>
                                <p className="profilenameholding">status</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                <p className="profilenameholding">June 8, 2021</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-3 makeholdingsinlinewithborder">
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingfour} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingtwo} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={3} xs={3}>
                            <div className="mt-1">
                                <ProgressBar className="setprogresscolors" now={80} label={`${80}%`} />
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="statussetseparate">
                                <div className="statuscolorcirclepurple"></div>
                                <p className="profilenameholding">status</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                <p className="profilenameholding">June 8, 2021</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-3 makeholdingsinlinewithborder">
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingfive} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingtwo} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={3} xs={3}>
                            <div className="mt-1">
                                <ProgressBar className="setprogresscolors" now={100} label={`${100}%`} />
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="statussetseparate">
                                <div className="statuscolorcirclepurple"></div>
                                <p className="profilenameholding">status</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                <p className="profilenameholding">June 8, 2021</p>
                            </div>
                        </Col>
                    </Col>
                </Row> <Row>
                    <Col md={12} className="mt-3 makeholdingsinlinewithborder">
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingsix} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="imagesandtexholder">
                                <Image src={images.holdingtwo} width="20px" height="20px" />
                                <p className="profilenameholding">Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={3} xs={3}>
                            <div className="mt-1">
                                <ProgressBar className="setprogresscolors" now={50} variant="success" label={`${50}%`} />
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="statussetseparate">
                                <div className="statuscolorcircle"></div>
                                <p className="profilenameholding">status</p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                <p className="profilenameholding">June 8, 2021</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Holdings;
