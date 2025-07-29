import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to MyApp</h1>
      <p>This is the home page. Use the buttons in the top right to login or register.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
};

export default Home;
