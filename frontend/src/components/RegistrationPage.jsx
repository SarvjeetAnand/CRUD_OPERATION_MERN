import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', { username,email,password});
      if (response.status === 201) {
        // Registration successful, redirect to login page
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed. User might already exist.');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h2>Registration Page</h2>
      <form style={{ width: '300px' }} onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter User name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="mt-3">
        Already have an account? <button className="btn btn-link" onClick={() => navigate('/login')}>Login here</button>
      </p>
    </div>
  );
}

export default RegistrationPage;



