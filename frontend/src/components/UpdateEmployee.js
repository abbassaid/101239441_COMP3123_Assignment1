import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setGender(data.gender);
          setSalary(data.salary)
        } else {
          console.error('Error updating specific employee');
        }
      } catch (error) {
        console.error('Error updating specific employee:', error);
      }
    };

    getEmployeeDetails();
  }, [id]);

  const update = async () => {
    try {
      const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          salary: salary
        }),
      });

      if (response.ok) {
        navigate('/employees');
      } else {
        console.error('Error updating employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };



  const cancel = () => {
    navigate('/employees');
  };

  return (
      <Container style={styles.container}>
        <h2 style={styles.heading}>Update Employee</h2>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control style={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control style={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control style={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
            <Button variant="success" onClick={update} style={styles.button}>Save</Button>
            <Button variant="danger" onClick={cancel} style={styles.button}>Cancel</Button>
        </Form>
      </Container>
  );
};

const styles = {
  container: {
    width: '50%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#F5F5F5',
  },
  heading: {
    textAlign: 'center',
    fontSize: '30px'
  },
  button: {
    margin: '5px'
  },
  input: {
    marginBottom: '10px'
  }
};

export default UpdateEmployee;

