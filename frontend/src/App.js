import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel.js';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/EmployeeCreate.js';
import EditEmployee from './components/EmployeeEdit.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
         <Route path="/employee-list" element={<EmployeeList />} />
         <Route path="employee-create" element={<CreateEmployee/>}/>
        <Route path="/employee-edit/:id" element={<EditEmployee/>} />
      </Routes>
    </Router>
  );
}

export default App;
