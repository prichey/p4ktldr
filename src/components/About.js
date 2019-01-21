import React from 'react';
import styled from 'styled-components';

const StyledAboutSection = styled.section`
  margin-bottom: 20px;

  @media (min-width: 550px) {
    margin-bottom: 40px;
  }
`;

const StyledAboutCopy = styled.div`
  font-size: 18px;
  line-height: 1.5em;
`;

const About = () => {
  return (
    <StyledAboutSection>
      <h1>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://pitchfork.com/"
        >
          Pitchfork
        </a>{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/TL;DR"
        >
          TL;DR
        </a>
      </h1>
      <StyledAboutCopy>
        <p>
          p4ktldr was made by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://prestonrichey.com/"
          >
            Preston Richey
          </a>{' '}
          and designed by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://heaviesthand.com/"
          >
            Anthony Schmiedeler
          </a>.
        </p>
        <p>p4ktldr uses public APIs and does not own the data provided.</p>
      </StyledAboutCopy>
    </StyledAboutSection>
  );
};

export default About;
