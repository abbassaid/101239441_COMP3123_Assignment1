import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8585/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        navigate('/employees'); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error occurred while trying to login:', error);
      setError('An error occurred while attempting to login, try again later...');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
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
      <div className="mb-3">
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
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
      <p style={styles.signup}>
        Don't have an account?
      </p>
      <p style={styles.signup}>
        <Link to="/signup">Sign Up!</Link>
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

export default Login;
