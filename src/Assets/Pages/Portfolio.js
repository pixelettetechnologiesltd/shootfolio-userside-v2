import React from 'react'
import Header from "../Components/Header";
import "../Css/Portfolio.css";
import {Container, Row, Col} from "react-bootstrap"
import Footer from '../Components/Footer';
import Portfoliofile from '../Components/Portfoliofile';
import { images } from '../../Images';
import Areachartcheck from "../Components/Areachartcheck"
const Portfolio = () => {
  return (
    <div>
        <Header/>
        <div className='ppotfiliohero'>
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                    <p className='portherohead'>My Portfolio</p>
                    <p className='portherodesc addpaddingherodesc'>Stay on top of your crypto portfolio with Shootfolio. Our easy-to-use platform lets you track your investments, view performance metrics, and make informed decisions.</p>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </Container>
           </div>
           <div className='portfolioseconfbluebg'>
            <Container>
                <Row>
                    <Col md={3} className='mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className='mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className='mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className='mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className=' marg-top-desk mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className='marg-top-desk mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className='marg-top-desk mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                    <Col md={3} className='marg-top-desk mblmargtop'>
                        <Portfoliofile image={images.portimg} name="Asset Name" feature="Feature 1.Feature 1.Feature 1" pricehead="Current Price" price="59WQ.568" valuehead="Total Value" value="KD6721"/>
                    </Col>
                </Row>
            </Container>
            <Container className='marg-top-portfolio100'>
                <Row>
                    <Col md={2}> 
                    <div>
                        <button className='chartleftbutton'>Day</button>
                        <button className='chartleftbutton'>Week</button>
                        <button className='chartleftbutton'>Month</button>
                        </div>
                    </Col>
                    <Col md={10}>
                        <p className='chartupheadportf'>Summary</p>
                        <p className='chartprtuphead'>Up maids me an ample stood given. Certainty say suffering his him collected intention promotion. Hill sold ham men made lose case. Views abode law heard jokes too. Was are delightful solicitude discovered collecting man day. Resolving neglected sir tolerably but existence conveying for. Day his put off unaffected literature partiality inhabiting.</p>
                    <Areachartcheck/>
                    </Col>
                </Row>
            </Container>
            
           </div>
                    
           <Footer/>
    </div>
  )
}

export default Portfolio