import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <form id="about">
        <p>
          <i>
            Hi. Ever wondered what it would be like to be a tennis guru. I'm not
            talking about playing in the Roland Garros necessarily, but being
            able to participate in friendly tournaments with friends and
            crushing it.
            <br />
            Well, you are in the right place. This site is dedicated to teach
            you in all things tennis related and in no time you should be well
            on your way to becoming the player of your dreams.
          </i>
        </p>
      </form>
    </div>
  </div>
);

export default AboutPage;
