import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8585/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      console.log('Sign Up Response:', response);
  
      if (response.ok) {
   
        setUsername('');
        setEmail('');
        setPassword('');
  
    
        navigate('/login');
      } else {
        setError('Unable to sign up. Please try again!.');
      }
    } catch (error) {
      console.error('Error occurred while trying to sign up:', error);
      setError('An error occurred during sign up');
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <div className="mb-3">
        <label htmlFor="username" style={styles.label}>Username:</label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <div className="d-grid">
        <button style={styles.button} className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
      <p style={styles.signup}>
        Already have an account?
      </p>
      <p style={styles.signup}>
        <Link to="/login">Login!</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#F5F5F5'
  },
  heading: {
    textAlign: 'center'
  },
  label: {
    marginBottom: '10px'
  },
  input: {
    padding: '10px',
    borderRadius: '20px',
    fontSize: '16px',
  },
  button: {
    marginTop:'20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    marginTop: '10px',
    textAlign: 'center',
  },
  signup: {
    textAlign:'center',
    marginTop: '15px'
  }
};

export default Signup;
