import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Error404Page extends Component {
  render() {
    return (
      <React.Fragment>
        <Container
          style={{ minHeight: '90vh' }}
          className="d-flex justify-content-center align-items-center"
        >
          <Row>
            <Col xs={12} className="text-center">
              <h1 className="display-2 my-4 font-weight-bold text-secondary">
                ERROR 404
              </h1>
            </Col>
            <Col xs={12} className="text-center">
              <p> The page you are looking for could not be found </p>
              <Button
                as={Link}
                to="/"
                variant="primary"
                className="shadow mt-3"
              >
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Error404Page;
