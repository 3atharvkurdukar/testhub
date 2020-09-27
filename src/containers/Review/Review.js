import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import ComingSoonPage from '../ComingSoonPage/ComingSoonPage';
import * as questionsActions from '../../store/actions/questions';
import classes from './Review.module.css';

class Review extends Component {
  state = {
    selectedQuestion: null,
    questions: null,
    subject: null,
  };

  componentDidMount() {
    const subject = new URLSearchParams(this.props.location.search).get(
      'subject'
    );
    this.setState({ subject: subject });
    this.props.onGetQuestions(subject);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questions && prevProps.questions !== this.props.questions) {
      this.setState({ questions: this.props.questions }, () =>
        this.setSelectedQuestion(0)
      );
    }
  }

  setSelectedQuestion = (id) => {
    this.clearAnswer();
    this.setState(
      {
        selectedQuestion: id,
      },
      () => {
        const correctAnswer = this.state.questions[id].answer;
        if (!!correctAnswer && correctAnswer !== '') {
          console.log(correctAnswer);
          const correctOption = document.getElementById(correctAnswer)
            .parentElement;
          correctOption.classList.add(classes.Selected);
        }
      }
    );
  };

  selectAnswer = (event) => {
    const el = event.target;
    // Remove focus from the button
    el.blur();

    const options = document.getElementsByClassName(classes.ListItem);
    for (let opt of options) {
      opt.classList.remove(classes.Selected);
    }
    el.classList.add(classes.Selected);

    const correctAnswer = el.children[0].id;
    const questions = JSON.parse(JSON.stringify(this.state.questions));
    const { selectedQuestion } = this.state;
    questions[selectedQuestion].answer = correctAnswer;
    this.setState({ questions: questions });
  };

  clearAnswer = () => {
    const options = document.getElementsByClassName(classes.ListItem);
    for (let opt of options) {
      opt.classList.remove(classes.Selected);
      opt.disabled = false;
    }
  };

  publish = () => {
    const { subject, questions } = this.state;
    this.props.onPublish(subject, this.props.auth, questions);
  };

  render() {
    if (this.props.loading) {
      return <Spinner variant="primary" />;
    } else if (this.props.errorMsg) {
      return <ComingSoonPage />;
    } else if (!this.state.questions || this.state.selectedQuestion === null) {
      return null;
    }
    const { selectedQuestion } = this.state;
    const data = this.state.questions[selectedQuestion];
    return (
      <Container>
        <Card className={classes.ContainerCard}>
          <Card.Body className="d-flex flex-column">
            {this.props.error ? (
              <Row>
                <Col xs={12}>
                  <Alert variant="danger">{this.props.error}</Alert>
                </Col>
              </Row>
            ) : null}
            <Row>
              <Col xs={12} md={2} lg={1}>
                <span className="font-weight-bold">{`Q.${data.question.id}`}</span>
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
                  variant="outline-danger"
                  size="lg"
                  disabled={selectedQuestion === 0}
                  onClick={() => this.setSelectedQuestion(selectedQuestion - 1)}
                >
                  Prev
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  disabled={selectedQuestion === this.state.questions.length}
                  onClick={this.publish}
                >
                  Publish{' '}
                  <i className="material-icons align-text-bottom">
                    cloud_upload
                  </i>
                </Button>
                <Button
                  variant="outline-success"
                  size="lg"
                  disabled={
                    selectedQuestion === this.state.questions.length - 1
                  }
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
    error: state.questions.errorMsg,
    questions: state.questions.questions,
    auth: state.admin.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestions: (subject) =>
      dispatch(questionsActions.getQuestions(subject)),
    onPublish: (subject, auth, questions) =>
      dispatch(questionsActions.editQuestions(subject, auth, questions)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
