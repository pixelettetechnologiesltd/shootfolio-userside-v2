import React from 'react'
import { images } from "../../Images";
import { Container, Row, Col, Image, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import "../Css/Game/CryptoPaymentTab.css"
import { Form } from 'react-bootstrap';
const CryptoPaymentTab = () => {
    return (
        <div>
            <Container>
                <Row className='mt-5 mb-5'>
                    <Col md={6} className='makeqrimagealigncent'>
                        <Image src={images.qr} />
                        <p className='scanqrhead'>Scan QR</p>
                    </Col>
                    <Col md={6} className='makepaddingintoformdivpayment'>
                        <Form>
                            <FormGroup>
                                <FormLabel className='cryptoformhead'>Select Subscription</FormLabel>
                            </FormGroup>
                            <label class="radio-button">
                                <input type="radio" name="example-radio" value="option1" />
                                <span class="radio"></span>
                                Silver
                            </label>
                            <label class="radio-button">
                                <input type="radio" name="example-radio" value="option1" />
                                <span class="radio"></span>
                                Golden
                            </label>
                            <label class="radio-button">
                                <input type="radio" name="example-radio" value="option1" />
                                <span class="radio"></span>
                                Platinum
                            </label>
                            <FormGroup className='mt-4'>
                                <Form.Label className='cryptoformhead mb-4'>Payment Method</Form.Label>
                                <Form.Select defaultValue="Choose..." className="cryptopaymentselect">
                                    <option>Select Payment Method</option>
                                    <option>Stripe</option>
                                    <option>Bank Account</option>
                                    <option>Metamsak</option>
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className='mt-4'>
                                <Form.Label className='cryptoformhead mb-4'>Transaction Hash</Form.Label>
                                <FormControl className="cryptopaymentselect"type="email" placeholder="cbxn...xoncnc">
                                    
                                </FormControl>
                            </FormGroup>
                            <div className='makecryptopayformbuttonend'>
                                <Button className='cryptopayformbutton'>Submit</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CryptoPaymentTab