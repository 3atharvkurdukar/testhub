import React, { Component } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import * as questionsActions from '../../store/actions/questions';
import classes from './Practice.module.css';

class Practice extends Component {
  state = {
    selectedQuestion: null,
    selectedAnswer: null,
    correctAnswer: null,
  };

  componentDidMount() {
    const subject = new URLSearchParams(this.props.location.search).get(
      'subject'
    );
    this.props.onGetQuestions(subject);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questions && !prevProps.questions) {
      this.setSelectedQuestion(0);
    }
  }

  setSelectedQuestion = (id) => {
    this.setState({
      selectedQuestion: id,
      correctAnswer: this.props.questions[id],
    });
  };

  selectAnswer = (event) => {
    const options = document.getElementsByClassName(classes.ListItem);
    for (let opt of options) {
      opt.classList.remove(classes.Selected);
    }
    const el = event.target;
    el.classList.add(classes.Selected);
    // Remove focus from the button
    el.blur();

    // const {correctAnswer} = this.state;
    // if(correctAnswer && correctAnswer !== "") {
    //   for (let opt of options) {
    //     opt.classList.remove(classes.Selected);
    //   }
    // }
  };

  render() {
    if (this.props.loading) {
      return <Spinner variant="primary" />;
    } else if (!this.props.questions || this.state.selectedQuestion === null) {
      return null;
    }
    const { selectedQuestion } = this.state;
    const data = this.props.questions[selectedQuestion];
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
                <ListGroup className={classes.ListGroup}>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span className="font-weight-bold mr-4">A</span>
                    {data.options.a}
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span className="font-weight-bold mr-4">B</span>
                    {data.options.b}
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span className="font-weight-bold mr-4">C</span>
                    {data.options.c}
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span className="font-weight-bold mr-4">D</span>
                    {data.options.d}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-auto">
              <Col xs={12} className="d-flex justify-content-between">
                <Button
                  variant="outline-danger"
                  size="lg"
                  disabled={selectedQuestion === 0}
                  onClick={() => this.setSelectedQuestion(selectedQuestion - 1)}
                >
                  Prev
                </Button>
                <Button
                  variant="outline-success"
                  size="lg"
                  disabled={selectedQuestion === this.props.questions.length}
                  onClick={() => this.setSelectedQuestion(selectedQuestion + 1)}
                >
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

const mapStateToProps = (state) => {
  return {
    loading: state.questions.loading,
    errorMsg: state.questions.errorMsg,
    questions: state.questions.questions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestions: (subject) =>
      dispatch(questionsActions.getQuestions(subject)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Practice);
