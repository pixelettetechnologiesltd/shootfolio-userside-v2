import React from "react";
import { useState } from "react";
import "../Css/Game/Settingtab.css";
import { images } from "../../Images";
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const Settingtab = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return (
        <div>
            <Container className="setpaddingprofile">
                <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                        <div className="makeprofilepicandtextcent">
                            <Image src={images.testtwo} width="100px" />
                            <p className="profilename mt-4">John Wick</p>
                        </div>
                    </Col>
                    <Col md={5}></Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p className="profilesubhead">General info</p>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="4" >
                                <Form.Label className="tabprofilelable">First Name</Form.Label>
                                <Form.Control
                                    className="tabprofileplaceholder"
                                    required
                                    type="text"
                                    placeholder="Alison"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="tabprofilelable">Last Name</Form.Label>
                                <Form.Control
                                    className="tabprofileplaceholder"
                                    required
                                    type="text"
                                    placeholder="Luke"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mt-5">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="tabprofilelable">Email Address</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        className="tabprofileplaceholder"
                                        type="text"
                                        placeholder="alison@gmail.com"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="tabprofilelable">User Name</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        className="tabprofileplaceholder"
                                        type="text"
                                        placeholder="Asd Luke"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12}>
                                <p className="profilesubhead mt-5">Password</p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="tabprofilelable">Current Password</Form.Label>
                                <Form.Control type="password" placeholder="*********" className="tabprofileplaceholder" required/>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="tabprofilelable">Enter New Password</Form.Label>
                                <Form.Control type="password" placeholder="*********" className="tabprofileplaceholder" required/>
                            </Form.Group>
                        </Row>
                        <Button className="savechangesprofiletab" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
};

export default Settingtab;
