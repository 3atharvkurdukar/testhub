import React, { Component } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import ComingSoonPage from '../ComingSoonPage/ComingSoonPage';
import * as questionsActions from '../../store/actions/questions';
import classes from './Practice.module.css';

class Practice extends Component {
  state = {
    selectedQuestion: null,
    correctAnswer: null,
    questions: null,
    correct: 0,
    incorrect: 0,
    showScore: false,
  };

  componentDidMount() {
    const subject = new URLSearchParams(this.props.location.search).get(
      'subject'
    );
    this.props.onGetQuestions(subject);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questions && prevProps.questions !== this.props.questions) {
      this.setState(
        { questions: this.props.questions.sort(() => Math.random() - 0.5) },
        () => this.setSelectedQuestion(0)
      );
    }
  }

  setSelectedQuestion = (id) => {
    this.clearAnswer();
    this.setState({
      selectedQuestion: id,
      correctAnswer: this.state.questions[id].answer,
    });
  };

  selectAnswer = (event) => {
    const el = event.target;
    // Remove focus from the button
    el.blur();
    const options = document.getElementsByClassName(classes.ListItem);
    const { correctAnswer } = this.state;
    if (correctAnswer && correctAnswer !== '') {
      for (let opt of options) {
        opt.disabled = true;
        if (opt.children[0].id === correctAnswer) {
          opt.classList.add(classes.Correct);
          if (opt !== el) {
            el.classList.add(classes.Incorrect);
            this.setState({ incorrect: this.state.incorrect + 1 });
          } else this.setState({ correct: this.state.correct + 1 });
        }
      }
    } else {
      for (let opt of options) {
        opt.classList.remove(classes.Selected);
      }
      el.classList.add(classes.Selected);
    }
  };

  clearAnswer = () => {
    const options = document.getElementsByClassName(classes.ListItem);
    for (let opt of options) {
      opt.classList.remove(classes.Selected);
      opt.classList.remove(classes.Correct);
      opt.classList.remove(classes.Incorrect);
      opt.disabled = false;
    }
  };

  evaluate = () => {
    this.setState({ showScore: true });
  };

  render() {
    if (this.props.loading) {
      return <Spinner variant="primary" />;
    } else if (this.props.errorMsg) {
      return <ComingSoonPage />;
    } else if (!this.state.questions || this.state.selectedQuestion === null) {
      return null;
    } else if (this.state.showScore) {
      const { correct, incorrect, questions } = this.state;
      const total = correct + incorrect;
      const unknown = questions.length - total;
      const score = correct * 1;
      const totalScore = total * 1;
      const percentage = ((score * 100) / totalScore).toFixed(2);

      return (
        <Container>
          <Card className={classes.ContainerCard}>
            <Card.Body className="d-flex flex-column">
              <Row>
                <Col xs={12} className="pb-3 text-center">
                  <h1>Score</h1>
                  <h2 className="display-4 my-4">
                    <span className="text-primary">{`${score} / ${totalScore}`}</span>
                    <br />
                    <span
                      className={
                        percentage >= 40 ? 'text-success' : 'text-danger'
                      }
                    >{`${percentage}%`}</span>
                  </h2>
                  <h3>
                    Correct: <span className="text-success">{correct}</span>
                  </h3>
                  <h3>
                    Incorrect: <span className="text-danger">{incorrect}</span>
                  </h3>
                  <h3>
                    Unknown: <span className="text-primary">{unknown}</span>
                  </h3>
                </Col>
              </Row>
              <Row className="mt-auto">
                <Col xs={12} className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => this.props.history.push('/')}
                  >
                    Go to Home
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      );
    }
    const { selectedQuestion, questions } = this.state;
    const data = questions[selectedQuestion];
    return (
      <Container>
        <Card className={classes.ContainerCard}>
          <Card.Body className="d-flex flex-column">
            <Row>
              <Col xs={12} className="pb-3 text-center">
                <h5 className="font-weight-bold">
                  {`${selectedQuestion + 1} / ${questions.length}`}
                </h5>
                <ProgressBar
                  min={0}
                  max={questions.length}
                  now={selectedQuestion + 1}
                  id="progress-bar"
                  style={{ height: '0.5em' }}
                  animated
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={2} lg={1}>
                <span className="font-weight-bold">{`Q.${
                  selectedQuestion + 1
                }`}</span>
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
                    <span id="a" className="font-weight-bold mr-4">
                      A
                    </span>
                    {data.options.a}
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span id="b" className="font-weight-bold mr-4">
                      B
                    </span>
                    {data.options.b}
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span id="c" className="font-weight-bold mr-4">
                      C
                    </span>
                    {data.options.c}
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.selectAnswer}
                    className={classes.ListItem}
                  >
                    <span id="d" className="font-weight-bold mr-4">
                      D
                    </span>
                    {data.options.d}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-auto">
              <Col xs={12} className="d-flex justify-content-between">
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => this.evaluate()}
                  disabled={selectedQuestion <= 0}
                  className="px-4 rounded-pill"
                >
                  Submit{' '}
                  <i className="material-icons align-text-bottom">publish</i>
                </Button>
                <Button
                  variant="outline-success"
                  size="lg"
                  onClick={() => this.setSelectedQuestion(selectedQuestion + 1)}
                  disabled={selectedQuestion === questions.length - 1}
                  className="px-4 rounded-pill"
                >
                  Next{' '}
                  <i className="material-icons align-text-bottom">
                    arrow_right_alt
                  </i>
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
