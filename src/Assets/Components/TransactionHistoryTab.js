import React from 'react'
import { Container, Row, Col, Button, } from "react-bootstrap";
import "../Css/Game/TransactionHistoryTab.css"
const TransactionHistoryTab = () => {
    return (
        <div>
            <Container className='mb-5'>
                <Row className='mt-5'>
                    <Col md={12} className='setpaddingandinline'>
                        <Col md={3}>
                            <p className='transhisttitle'>Subscription</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisttitle'>Payment Method</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisttitle'>Transaction Hash</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisttitle textstattitlecent'>Status</p>
                        </Col>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={12} className=' rowtranshistorybackground'>
                        <Col md={3}>
                            <p className='transhisvalue'>Platinum</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisvalue'>Stipe</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisvalue'>0cerXi............o9Xn</p>
                        </Col>
                        <Col md={3}>
                            <div className='statusgreenbgpaymenthistory'>
                                <p className='transhisvalue'>Successfull</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={12} className=' rowtranshistorybackground'>
                        <Col md={3}>
                            <p className='transhisvalue'>Golden</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisvalue'>Metamask</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisvalue'>0cerXi............o9Xn</p>
                        </Col>
                        <Col md={3}>
                            <div className='statusgreenbgpaymenthistory'>
                                <p className='transhisvalue'>Successfull</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={12} className=' rowtranshistorybackground'>
                        <Col md={3}>
                            <p className='transhisvalue'>Silver</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisvalue'>Bank Account</p>
                        </Col>
                        <Col md={3}>
                            <p className='transhisvalue'>0cerXi............o9Xn</p>
                        </Col>
                        <Col md={3}>
                            <div className='statusgreenbgpaymenthistory'>
                                <p className='transhisvalue'>Successfull</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TransactionHistoryTab