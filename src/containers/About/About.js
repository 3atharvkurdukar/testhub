import React, { Component } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Modal from '../../components/Modal/Modal';
import gpayQR from '../../assets/images/gpayQR.svg';
import testhubHome from '../../assets/images/testhub-home.png';
import architectureImg from '../../assets/images/architecture.svg';
import starRepoImg from '../../assets/images/star-repo-github.svg';
import donateImg from '../../assets/images/donate.png';
import collabImg from '../../assets/images/collaborate.svg';

import classes from './About.module.css';

class About extends Component {
  state = {
    modal: false,
  };

  render() {
    return (
      <Container>
        <Modal
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
          title="Donate"
        >
          <div className={classes.ImageContainer}>
            <Image thumbnail src={gpayQR} />
            <h5>Atharv Kurdukar</h5>
            <span>3atharvkurdukar@oksbi</span>
          </div>
        </Modal>
        <section id="about">
          <h2 className={classes.Header}>About</h2>
          <Row>
            <Col xs={12} md={7} className={classes.AboutContainer}>
              <h3>A Fun Project to Make Your Study Easier</h3>
              <ul>
                <li>Simple</li>
                <li>Modern</li>
                <li>Dynamic</li>
                <li>Intutitive</li>
              </ul>
            </Col>
            <Col xs={12} md={5} className={classes.ImageContainer}>
              <Image src={testhubHome} className={classes.RightSkewed} />
            </Col>
          </Row>
        </section>
        <section id="architecture">
          <h2 className={classes.Header}>Architecture</h2>
          <Row>
            <Col xs={12} md={5} className={classes.ImageContainer}>
              <Image src={architectureImg} className={classes.LeftSkewed} />
            </Col>
            <Col xs={12} md={7} className={classes.ArchContainer}>
              <ul>
                <li>Frontend using React.JS</li>
                <li>Backend using NodeJS + Express</li>
                <li>Deployment via AWS Amplify</li>
                <li>CI/CD Workflow with GitHub</li>
                <li>Edge Optimized with AWS CloudFront</li>
              </ul>
            </Col>
          </Row>
        </section>
        <section id="support">
          <h2 className={classes.Header}>Support</h2>
          <p className={classes.Subtext}>
            This project is far from complete and requires support to work on it
            and generalize the product for multiple use cases
          </p>
          <h3 className={classes.Subheader}>How Can You Help?</h3>
          <Row>
            <Col xs={12} md={8} className={classes.SupportContainer}>
              <h4>Star the repository</h4>
              <p>
                Make this project popular. More stars means more people notice
                the project on GitHub.
              </p>
              <Button
                as={Link}
                href="https://ww.gihub.com/3atharvkurdukar/testhub"
                target="_blank"
                variant="primary"
              >
                Star <i className="material-icons align-text-bottom">grade</i>
              </Button>
            </Col>
            <Col xs={12} md={4} className={classes.ImageContainer}>
              <Image src={starRepoImg} className={classes.SupportImg} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8} className={classes.SupportContainer}>
              <h4>Donate</h4>
              <p>
                Managing the cloud infrastructure is quite expensive. So is the
                time to develop. Help by donating as much as you can.
              </p>
              <Button
                as={Link}
                variant="primary"
                onClick={() => this.setState({ modal: true })}
              >
                Donate{' '}
                <i className="material-icons align-text-bottom">
                  monetization_on
                </i>
              </Button>
            </Col>
            <Col xs={12} md={4} className={classes.ImageContainer}>
              <Image src={donateImg} fluid className={classes.SupportImg} />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col xs={12} md={8} className={classes.SupportContainer}>
              <h4>Collaborate</h4>
              <p>
                You can help the project become a success. If you have the
                skills required, fork this repository and start collaborating.
              </p>
              <Button
                as={Link}
                href="https://ww.gihub.com/3atharvkurdukar/testhub"
                target="_blank"
                variant="primary"
              >
                Collaborate{' '}
                <i className="material-icons align-text-bottom">groups</i>
              </Button>
            </Col>
            <Col xs={12} md={4} className={classes.ImageContainer}>
              <Image src={collabImg} className={classes.SupportImg} />
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default About;
