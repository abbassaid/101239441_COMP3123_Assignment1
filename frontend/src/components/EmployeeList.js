import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployeeList = async () => {
      try {
        const response = await fetch('http://localhost:8585/api/v1/emp/employees');
        if (response.ok) {
          const data = await response.json();
          setEmployeeList(data);
        } else {
          console.error('Error getting employee list');
        }
      } catch (error) {
        console.error('Error getting employee list:', error);
      }
    };

    getEmployeeList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8585/api/v1/emp/employees/?eid=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedList = employeeList.filter((employee) => employee._id !== id);
        setEmployeeList(updatedList);
      } else {
        console.error('Error deleting employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
      <div>
        <h2 style={styles.heading}>List of Employees</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {employeeList.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>
                  <Link to={`/view-employee/${employee._id}`}>
                    <Button variant="primary" style={styles.button}>View</Button>
                  </Link>
                  <Link to={`/update-employee/${employee._id}`}>
                    <Button variant="success" style={styles.button}>Update</Button>
                  </Link>
                  <Button variant="danger" style={styles.button} onClick={() => handleDelete(employee._id)}>Delete</Button>
                </td>
              </tr>
          ))}
          </tbody>
          <Link to="/add-employee">
            <Button variant="success" style={styles.addEmpButton}>Add Employee</Button>
          </Link>
        </Table>
      </div>
  );
};

const styles = {
  heading: {
    textAlign: 'center',
    fontSize: '40px'
  },
  button: {
    margin: '0 5px 0 5px'
  },
  addEmpButton: {
    margin: '20px'
  }
};

export default EmployeeList;
