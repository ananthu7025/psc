import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Privacy and Policy</h1>
      </header>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Introduction</h2>
        <p style={styles.paragraph}>
          Welcome to the Kerala PSC Training Software. This Privacy and Policy
          page outlines the types of personal information we collect, how it is
          used, and your choices regarding this information.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Information Collection and Use</h2>
        <p style={styles.paragraph}>
          We may collect personal information, including but not limited to,
          your name, email address, and other relevant details. This information
          is collected for the purpose of providing you with access to our
          training materials and enhancing your learning experience.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Google Authentication</h2>
        <p style={styles.paragraph}>
          Our website uses Google authentication to verify user identity. When
          you choose to log in using your Google account, we may collect and
          store information provided by Google, such as your name and email
          address. This information is used solely for authentication purposes
          and is not shared with third parties.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Security</h2>
        <p style={styles.paragraph}>
          We take the security of your personal information seriously. We
          implement appropriate measures to protect against unauthorized access,
          alteration, disclosure, or destruction of your information.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Updates to Privacy Policy</h2>
        <p style={styles.paragraph}>
          We may update our Privacy and Policy page from time to time. Any
          changes will be posted on this page, and the date of the last update
          will be indicated at the top of the page.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Contact Us</h2>
        <p style={styles.paragraph}>
          If you have any questions or concerns about our Privacy and Policy,
          please contact us at{' '}
          <a href="pscgreen@gmail.com" style={styles.link}>
            pscgreen@gmail.com
          </a>
          .
        </p>
      </section>

      <footer style={styles.footer}>
        <p>Last Updated: January 1, 2023</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
  },
  heading: {
    color: '#333',
  },
  section: {
    marginBottom: '20px',
  },
  subHeading: {
    color: '#007bff',
  },
  paragraph: {
    lineHeight: '1.5',
  },
  link: {
    color: '#007bff',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#777',
  },
};

export default PrivacyPolicy;
