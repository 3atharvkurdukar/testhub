import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark d-print-none">
      <Container className="d-flex justify-content-between text-center text-light">
        <span>
          Created by{' '}
          <a
            href="https://www.github.com/3atharvkurdukar"
            rel="noopener noreferrer"
            target="_blank"
            className="text-light text-decoration-none"
          >
            Atharv Kurdukar
          </a>
        </span>
        <Button
          as={Link}
          to="/about"
          variant="outline-light"
          size="sm"
          className="rounded-pill px-3 mx-3"
        >
          SUPPORT THE CAUSE
        </Button>
      </Container>
    </footer>
  );
};

export default Footer;
