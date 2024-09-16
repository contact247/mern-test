import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavComponent from './NavComponent';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Fetch employee data from backend on component mount
  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/');
    }

    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees'); // Change this to your API endpoint
      const data = await response.json();
      setEmployees(data); // Assuming the API returns an array of employees
    };

    fetchEmployees();
  }, [navigate]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the username from storage
    localStorage.removeItem('token'); // If you're using JWT
    navigate('/'); // Redirect to login page
  };

  // Edit employee handler
  const handleEdit = (employeeId) => {
    navigate(`/employee-edit/${employeeId}`); // Redirect to the employee edit page
  };

  // Delete employee handler
  const handleDelete = async (employeeId) => {
    const response = await fetch(`/api/employees/${employeeId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the employee from the list after successful deletion
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    } else {
      console.error('Failed to delete employee');
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavComponent/>
      <button style={styles.createButton} onClick={()=>{navigate('/employee-create');}}>Create Employee</button>
      <h1 style={styles.h1} >Employee List</h1>

      {/* Employee List Table */}
      <table style={styles.table} border="1">
        <thead>
          <tr>
            <th>Unique ID</th>
            {/* <th>Image</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.uniqueId}</td>
              {/* <td><img src={employee.image} alt={employee.name} width="50" /></td> */}
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{new Date(employee.createDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table:{
    width:'100vw'
  }
  ,
  h1:{
    textAlign:'center'
  },
  createButton:{
    backgroundColor:'lightgreen',
    float:'right',
    width:'150px',
    height:'50px',
    marginRight:'10px'
  }
}
export default EmployeeList;
