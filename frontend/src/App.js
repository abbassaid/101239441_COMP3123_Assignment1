import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {

    setIsLoggedIn(false);
  };

  return (
      <Router>
        <div>
          {isLoggedIn && (
              <nav style={styles.navbar}>
                <div style={styles.header}>
                  <h1>Employee Management Application</h1>
                  <Link to="/login">
                    <button onClick={handleLogout} style={styles.logoutButton}>
                      Log Out
                    </button>
                  </Link>
                </div>
              </nav>
          )}

          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn}/>}
            />
            <Route
                path="/employees"
                element={isLoggedIn ? <EmployeeList/> : <Navigate to="/login"/>}
            />
            <Route
                path="/add-employee"
                element={isLoggedIn ? <AddEmployee/> : <Navigate to="/login"/>}
            />
            <Route
                path="/view-employee/:id"
                element={isLoggedIn ? <ViewEmployee/> : <Navigate to="/login"/>}
            />
            <Route
                path="/update-employee/:id"
                element={isLoggedIn ? <UpdateEmployee/> : <Navigate to="/login"/>}
            />
            <Route path="/" element={<Navigate to="/login"/>}/>
          </Routes>
        </div>
      </Router>
  )
}

  const styles = {
    navbar: {
      backgroundColor: '#333', // Bootstrap primary color
      padding: '10px',
      color: 'white',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoutButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
    }
  }

export default App;
