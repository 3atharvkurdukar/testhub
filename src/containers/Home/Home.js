import React, { Component } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import iotImg from '../../assets/images/iot.jpg';
import deepLearningImg from '../../assets/images/deep-learning.jpg';
import crmImg from '../../assets/images/crm.jpg';
import bigDataImg from '../../assets/images/big-data.jpg';
import dataMiningImg from '../../assets/images/data-mining.jpg';
import epsImg from '../../assets/images/eps.jpg';
import cyberLawImg from '../../assets/images/cyber-law.jpg';

class Home extends Component {
  state = {
    mode: 'Practice',
  };

  toggleMode = () => {
    const { mode } = this.state;
    this.setState({ mode: mode === 'Practice' ? 'Review' : 'Practice' });
  };

  render() {
    let redirect = 'practice';
    if (this.state.mode === 'Review') redirect = 'review';

    let subjectCards = [
      {
        title: 'Internet of Things',
        image: iotImg,
        link: `/${redirect}?subject=internet-of-things`,
      },
      {
        title: 'Deep Learning',
        image: deepLearningImg,
        link: `/${redirect}?subject=deep-learning`,
      },
      {
        title: 'CRM & SCM',
        image: crmImg,
        link: `/${redirect}?subject=crm-scm`,
      },
      {
        title: 'Web & Text Mining',
        image: dataMiningImg,
        link: `/${redirect}?subject=web-text-mining`,
      },
      {
        title: 'Big Data Analytics',
        image: bigDataImg,
        link: `/${redirect}?subject=big-data-analytics`,
      },
      {
        title: 'Electronic Payment Systems',
        image: epsImg,
        link: `/${redirect}?subject=electronic-payment-system`,
      },
      {
        title: 'Cyber Laws & IPR',
        image: cyberLawImg,
        link: `/${redirect}?subject=cyber-law-ipr`,
      },
    ];

    return (
      <Container>
        {this.props.admin ? (
          <Row>
            <Col xs={12} className="text-center">
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={this.toggleMode}
                className="rounded-pill my-2 px-4"
              >
                {this.state.mode + ' Mode'}
              </Button>
            </Col>
          </Row>
        ) : null}
        <Row className="align-center">
          {subjectCards.map((subject) => (
            <Col xs={12} md={6} lg={3} className="my-3" key={subject.title}>
              <Card
                className="shadow text-center font-weight-bold rounded-card hoverable"
                onClick={() => this.props.history.push(subject.link)}
              >
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
const mapStateToProps = (state) => {
  return {
    admin: state.admin.adminData,
  };
};
export default connect(mapStateToProps)(Home);
