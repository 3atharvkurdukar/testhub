import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import ComingSoonPage from '../ComingSoonPage/ComingSoonPage';
import * as questionsActions from '../../store/actions/questions';
import classes from './Revise.module.css';

class Revise extends Component {
  componentDidMount() {
    const subject = new URLSearchParams(this.props.location.search).get(
      'subject'
    );
    this.props.onGetQuestions(subject);
  }

  render() {
    if (this.props.loading) {
      return <Spinner variant="primary" />;
    } else if (this.props.errorMsg) {
      return <ComingSoonPage />;
    } else if (!this.props.questions) {
      return null;
    }
    return (
      <Container>
        {this.props.questions.map((data) => (
          <Card className={classes.ContainerCard} key={data.id}>
            <Card.Body>
              <Row>
                <Col xs={12} md={2} lg={1}>
                  <span className="font-weight-bold">{`Q.${data.id}`}</span>
                </Col>
                <Col xs={12} md={10} lg={11}>
                  <p>{data.question}</p>
                </Col>
              </Row>
              <Row>
                {Object.keys(data.options).map((opt) => {
                  let classNames = [classes.ListItem];
                  if (opt === data.answer) {
                    classNames.push(classes.Selected);
                  }
                  return (
                    <Col
                      xs={12}
                      lg={6}
                      className={classNames.join(' ')}
                      key={opt}
                    >
                      <Row>
                        <Col
                          xs={1}
                          id={opt}
                          className="font-weight-bold text-uppercase"
                        >
                          {opt}
                        </Col>
                        <Col xs={11}>{data.options[opt]}</Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.questions.loading,
    error: state.questions.errorMsg,
    questions: state.questions.questions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestions: (subject) =>
      dispatch(questionsActions.getQuestions(subject)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Revise);
