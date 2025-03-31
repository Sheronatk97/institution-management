
    import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // useNavigate from React Router v6

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // hook for navigation
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Send login request to the server
        const response = await axios.post('http://localhost:3000/api/auth/loginall', { email, password });
        
        console.log('Response from server:', response.data); // Log the full response

        const { token, role } = response.data; // Assuming response contains 'token' and 'role'
        
        if (!role) {     
            setMessage('Role not provided in the response');
            return;
        }

        // Save the token in localStorage
        localStorage.setItem('token', token);

        setMessage('Login successful');

        // Ensure proper navigation using a break after each case
        switch (role.toLowerCase()) {
            case 'admin':
                navigate('/admin');
                break;
            case 'student':
                navigate('/student');
                break;
            case 'digital marketer':
                navigate('/digital_marketing');
                break;
            case 'designer':
                navigate('/graphic_designer');
                break;
            case 'associate consultant':
                navigate('/associate_consultant');
                break;
            case 'video editor':
                navigate('/video_Editor');
                break;
            case 'finance manager':
                navigate('/finance');
                break;
            case 'team leader':
                navigate('/team_lead');
                break;
            case 'bdm':
                navigate('/sales');
                break;
            default:
                setMessage('Invalid role');
        }
    } catch (error) {
        console.error('Login error:', error);
        setMessage(error.response?.data?.message || 'Login failed');
    }
};


    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: '100px',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>

                {/* Registration Link */}
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Signup
                        </Link>
                    </Typography>
                </Box>

                {message && (
                    <Typography
                        variant="body2"
                        color={message === 'Login successful' ? 'green' : 'red'}
                        sx={{ marginTop: 2 }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Login;
