import { Container, Row, Col } from 'react-bootstrap';
import '../Css/Holdings.css';
import React, { useEffect, useState } from 'react';

const Holdings = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://shootfolio-app-bnvfa.ondigitalocean.app/pixelette-be2/v1/api/leaderboard'
        // 'http://192.168.0.103:3001/v1/api/leaderboard'
      );
      const data = await response.json();
      // console.error('response fetching data: ', data);
      // console.error('response fetching data with error: ', data.errors);
      if (data.errors && data.errors.length > 0) {
        return;
      }
      setData(data); // Set the data in state
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="makescrolsecinmbl">
      <Container className="holdingsbgblack mt-5">
        <Row>
          <Col md={12} className="allcomponentsofholding">
            <Col md={1} xs={1}>
              <p className="mainheadingsofholding">Rank</p>
            </Col>
            <Col md={3} xs={3} className="marg-left-mbl">
              <p className="mainheadingsofholding">Name/Username</p>
            </Col>
            <Col md={2} xs={2}>
              <p className="mainheadingsofholding ">Wins</p>
            </Col>
            <Col md={2} xs={2}>
              <p className="mainheadingsofholding">Goals For (GF)</p>
            </Col>
            <Col md={2} xs={2}>
              <p className="mainheadingsofholding ">Goals Against (GA)</p>
            </Col>
            <Col md={2} xs={2}>
              <p className="mainheadingsofholding">Goal Difference (GD)</p>
            </Col>
          </Col>
        </Row>
        {data.map((item, index) => (
          <Row key={index}>
            <Col md={12} className="mt-4 makeholdingsinlinewithborder">
              <Col md={1} xs={1}>
                <p className="profilenameholding">{index + 1}</p>
              </Col>
              <Col md={3} xs={3} className="marg-left-mbl">
                <p className="profilenameholding">
                  {item?.user?.name}/{item?.user?.userName}
                </p>
              </Col>
              <Col md={2} xs={2}>
                <p className="profilenameholding">{item?.wins}</p>
              </Col>
              <Col md={2} xs={2}>
                <p className="profilenameholding">{item.goalsFor}</p>
              </Col>
              <Col md={2} xs={2}>
                <p className="profilenameholding">{item.goalsAgainst}</p>
              </Col>
              <Col md={2} xs={2}>
                <p className="profilenameholding">{item.goalDifference}</p>
              </Col>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Holdings;
