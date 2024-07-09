// src/components/Login.tsx
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../stores/AuthContext';
import '../styles/LoginForm.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const {login} = authContext;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://mpp-backend-l6xq.onrender.com/auth/login',
                {username, password},
            );
            login(response.data.token);
            navigate('/paintings');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid Credentials. Try again!');
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
                <button type='submit'>Login</button>
                {errorMessage && (
                    <p className='error-message'>{errorMessage}</p>
                )}
                <p>Don't have an account yet?</p>
                <a onClick={() => navigate(`/auth/register`)}>Register</a>
            </form>
        </div>
    );
};

export default Login;
