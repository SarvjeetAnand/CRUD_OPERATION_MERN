import React, { useState } from 'react';
import axios from 'axios';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loginUser = async (e) => {
//     e.preventDefault();
//     const { data } = await axios.post('http://localhost:8080/api/users/login', { email, password });
//     console.log(data); // Handle authentication state
//   };

//   return (
//     <form onSubmit={loginUser}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginPage;



import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
            const { data } = await axios.post('http://localhost:8080/api/users/login', { email, password });
        console.log(data); // Handle authentication state

        navigate('/home');
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <h2>Login Page</h2>
            <form style={{ width: '300px' }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />        
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />                
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={loginUser}>Login</button>
            </form>
            <p className="mt-3">
                Don't have an account? <button className="btn btn-link" onClick={() => navigate('/register')}>Register here</button>
            </p>
        </div>
    );
}

export default LoginPage;
