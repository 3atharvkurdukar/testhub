import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import iotImg from '../../assets/images/iot.jpg';
import deepLearningImg from '../../assets/images/deep-learning.jpg';
import crmImg from '../../assets/images/crm.jpg';
import bigDataImg from '../../assets/images/big-data.jpg';
import dataMiningImg from '../../assets/images/data-mining.jpg';
import epsImg from '../../assets/images/eps.jpg';
import cyberLawImg from '../../assets/images/cyber-law.jpg';

class Home extends Component {
  render() {
    let subjectCards = [
      { title: 'Internet of Things', image: iotImg },
      { title: 'Deep Learning', image: deepLearningImg },
      { title: 'CRM & SCM', image: crmImg },
      { title: 'Web & Text Mining', image: dataMiningImg },
      { title: 'Big Data Analytics', image: bigDataImg },
      { title: 'Electronic Payment Systems', image: epsImg },
      { title: 'Cyber Laws & IPR', image: cyberLawImg },
    ];

    return (
      <Container>
        <Row className="align-center">
          {subjectCards.map((subject) => (
            <Col xs={12} md={6} lg={3} className="my-3">
              <Card className="shadow text-center font-weight-bold rounded-card">
                <Card.Img src={subject.image} />
                <Card.Body>
                  <Card.Text>{subject.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Home;
