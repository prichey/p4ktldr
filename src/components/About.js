import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

const StyledAboutSection = styled.section`
  line-height: 1.5em;
`;

const About = () => {
  ReactGA.pageview('/about');

  return (
    <StyledAboutSection>
      <p>
        p4ktldr{' '}
        <a
          href="https://prestonrichey.com/blog/i-got-got/"
          target="_blank"
          rel="noopener noreferrer"
        >
          got got
        </a>.
      </p>
      <p>
        p4ktldr was made by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://prestonrichey.com/"
        >
          Preston Richey
        </a>.
      </p>
      <p>
        p4ktldr was designed by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://heaviesthand.com/"
        >
          Anthony Schmiedeler
        </a>.
      </p>
      <p>p4ktldr uses public APIs and does not own the data provided.</p>
      <p>p4ktldr is pronounced phonetically.</p>
    </StyledAboutSection>
  );
};

export default About;
