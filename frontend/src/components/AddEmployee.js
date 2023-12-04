import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8585/api/v1/emp/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, gender, salary }),
      });

      if (response.ok) {
        navigate('/employees');
      } else {
        console.error('Error saving employee');
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
      <Container style={styles.container}>
        <h2 style={styles.heading}>Add Employee</h2>
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
          <Form.Group controlId="gender">
            <Form.Label>Gender:</Form.Label>
            <Form.Control style={styles.input} as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="salary">
            <Form.Label>Salary:</Form.Label>
            <Form.Control style={styles.input} type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </Form.Group>
          <Button variant="success" onClick={handleSave} style={styles.button}>
            Save
          </Button>
          <Button variant="danger" onClick={handleCancel} style={styles.button}>
            Cancel
          </Button>
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

export default AddEmployee;
