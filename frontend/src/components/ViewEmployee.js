import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          console.error('Error getting employee details');
        }
      } catch (error) {
        console.error('Error getting employee details:', error);
      }
    };

    getEmployeeDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/employees');
  };

  return (
    <Card style={styles.container} >
      <Card.Body>
        <Card.Title style={styles.heading} >View Employee Details</Card.Title>
      </Card.Body>
      {employee ? (
        <ListGroup className="list-group-flush">
          <ListGroup.Item><strong>First Name:</strong> {employee.first_name}</ListGroup.Item>
          <ListGroup.Item><strong>Last Name:</strong> {employee.last_name}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {employee.email}</ListGroup.Item>
          <ListGroup.Item><strong>Gender:</strong> {employee.gender}</ListGroup.Item>
          <ListGroup.Item><strong>Salary:</strong> {employee.salary}</ListGroup.Item>
        </ListGroup>

      ) : (
          <p style={styles.loading}>Loading details</p>
      )}
      <Card.Body>
        <Card.Link><Button variant="primary" onClick={handleBack} style={styles.backButton}>Back</Button></Card.Link>
      </Card.Body>
    </Card>
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
    textAlign: 'center',
    fontSize: '30px'
  },
  loading: {
    textAlign: 'center',
  }
};

export default ViewEmployee;
