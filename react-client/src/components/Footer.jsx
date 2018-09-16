import React from 'react';

const Footer = () => (
  <div className="footer" style={{ position: 'center', bottom: 0, width: '100%', height: '60px', alignItems: 'center', marginTop: 200 }}>
    <p style={{ display: 'block' }}>
      <span>© 2018 Team-Fleming Inc. Associated with Hack Reactor. All rights reserved. </span>
      <span>
        Event Information Provided By:
        &nbsp; &nbsp;
        <a target="_blank" href="https://www.eventbrite.com/developer/v3/" style={{ fontWeight: 'bold', fontSize: 19, textDecoration: 'underline' }}>EventBrite</a>
        &nbsp; &nbsp;
        <a target="_blank" href="https://www.meetup.com/meetup_api/" style={{ fontWeight: 'bold', fontSize: 19, textDecoration: 'underline' }}>MeetUp</a>
      </span>
    </p>
  </div>
);

export default Footer;