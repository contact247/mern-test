import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavComponent from './NavComponent';

const EditEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: ''
  });
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{

    const fetchEmployee = async () => {
        const response = await fetch(`/api/employees/${id}`);
        const data = await response.json();
        setFormData(data);
      };
  
      fetchEmployee();

  },[id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if(type === 'checkbox'){
        setFormData((prevData) => ({
            ...prevData,
            "course":name
        }));
    }else{
      setFormData((prevData) => ({
        ...prevData,
          [name]: value,
      }));}
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`/api/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...formData})
        });
    
        if (response.ok) {
          const updatedEmployee = await response.json();
          console.log('Employee updated successfully:', updatedEmployee);
          navigate('/employee-list');
        } else {
            alert(response.statusText);
          console.error('Failed to create employee:', response.statusText);
        }
      } catch (error) {
        alert(error.message);
        console.error('Error creating employee:', error);
      }

  };

  return (
    <>
    <NavComponent/>
    <div style={styles.formDiv}>
    <form style={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="mobile">Mobile No:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="designation">Designation:</label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div>
        <label>Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
      </div>

      <div>
        <label>Course:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="MCA"
              checked={formData.course==='MCA'}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="BCA"
              checked={formData.course==='BCA'}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="BSC"
              checked={formData.course==='BSC'}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>
      </div>

      <button type="submit">Save Changes</button>
    </form>
    </div>
    </>
  );
};

const styles = {
    formDiv:{
        marginTop:'20px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100vh'
    },
    form:{
        height:'100vh'
    }
}


export default EditEmployee;
