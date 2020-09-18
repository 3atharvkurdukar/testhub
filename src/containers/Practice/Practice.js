import React, { Component } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';

import classes from './Practice.module.css';

class Practice extends Component {
  render() {
    const data = {
      id: '1',
      question:
        '_________ refers to those solutions that allow communication between\rdevices of the same type and a specific application, all via wired or\rwireless communication networks.',
      'option-a': 'Demographics',
      'option-b': 'IoT',
      'option-c': 'M2M communication',
      'option-d': 'None of these.',
      answer: 'a',
    };
    return (
      <Container>
        <Card className={classes.ContainerCard}>
          <Card.Body className="d-flex flex-column">
            <Row>
              <Col xs={12} md={2} lg={1}>
                <span className="font-weight-bold">{`Q.${data.id}`}</span>
              </Col>
              <Col xs={12} md={10} lg={11}>
                <p>{data.question}</p>
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                md={{ span: 10, offset: 2 }}
                lg={{ span: 11, offset: 1 }}
                className="mt-3"
              >
                <ListGroup variant="flush">
                  <ListGroup.Item action>
                    <span className="font-weight-bold mr-4">A</span>
                    {data['option-a']}
                  </ListGroup.Item>
                  <ListGroup.Item action>
                    <span className="font-weight-bold mr-4">B</span>
                    {data['option-b']}
                  </ListGroup.Item>
                  <ListGroup.Item action>
                    <span className="font-weight-bold mr-4">C</span>
                    {data['option-c']}
                  </ListGroup.Item>
                  <ListGroup.Item action>
                    <span className="font-weight-bold mr-4">D</span>
                    {data['option-d']}
                  </ListGroup.Item>
                </ListGroup>
                {/* <p className="text-dark my-2 rounded-pill">
                  <span className="font-weight-bold mr-4">A</span>
                  {data['option-a']}
                </p> */}
              </Col>
            </Row>
            <Row className="mt-auto">
              <Col xs={12} className="d-flex justify-content-between">
                <Button variant="outline-danger" size="lg">
                  Prev
                </Button>
                <Button variant="outline-success" size="lg">
                  Next
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Practice;
