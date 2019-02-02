import React from 'react';
import styled from 'styled-components';

const StyledAboutSection = styled.section`
  line-height: 1.5em;
`;

const About = () => {
  return (
    <StyledAboutSection>
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
