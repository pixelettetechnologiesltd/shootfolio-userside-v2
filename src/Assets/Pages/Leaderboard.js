import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Holdings from '../Components/Holdings';
const Leaderboard = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col md={12}>
                        <p className="chartupheadportfcent">Global Leaderboard</p>
                        <p className="chartprtupheadcent padlrhold">
                        Welcome to the Global Leaderboard of Shootfolio, where skill, strategy, and competitive spirit come to life. This leaderboard showcases the top performers in our dynamic and thrilling game environment. Here, you can track the rankings of players based on their wins, goals scored, and overall performance. Witness the prowess of top players as they climb the ranks, showcasing their mastery in scoring goals and strategic gameplay. Whether you're a seasoned player or a newcomer, this leaderboard is your gateway to understanding the benchmarks of excellence in Shootfolio. Keep an eye on these rankings - they're a testament to skill, dedication, and the vibrant community that makes our game truly special.
                        </p>
                        <Holdings />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Leaderboard