import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark d-print-none">
      <Container className="text-center text-light">
        Powered by{' '}
        <a
          href="https://preview.printopark.com/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-light text-decoration-none"
        >
          Print-O-Park, Latur
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
