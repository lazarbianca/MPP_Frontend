// src/components/Login.tsx
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../stores/AuthContext';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setErrorMessage('');
            await axios.post(
                'https://mpp-backend-l6xq.onrender.com/auth/register',
                {
                    username,
                    password,
                    role,
                },
            );
            navigate('/auth/login');
        } catch (error) {
            console.error('Register failed:', error);
            setErrorMessage('Registration failed. Try again!');
        }
    };
    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select
                    name='role'
                    id='role'
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                >
                    <option value='none' selected disabled hidden>
                        Select an Option
                    </option>
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                    <option value='manager'>Manager</option>
                </select>
                <p> </p>
                <button onClick={() => navigate(`/auth/register`)}>
                    Register
                </button>
                {errorMessage && (
                    <p className='error-message'>{errorMessage}</p>
                )}
                <a onClick={() => navigate(`/auth/login`)}> Back </a>
            </form>
        </div>
    );
};

export default Register;
