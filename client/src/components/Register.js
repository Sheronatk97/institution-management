import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Register = () => {
    // State to hold input values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled out
        if (!username || !email || !password || !role) {
            setMessage("Please provide all required fields: username, email, password, and role.");
            return;
        }

        try {
            // Send data to the backend to register the user
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username,
                email,
                password,
                role
            });

            // Success message from backend
            setMessage(response.data.message);
        } catch (error) {
            // Error message if registration failed
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="xs" style={{ padding: '45px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                        >
                            <MenuItem value="student">Student</MenuItem>
                            {/* <MenuItem value="hr">HR</MenuItem> */}
                            <MenuItem value="digital_marketing">Digital Marketing</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Register
                    </Button>
                </form>

                {message && (
                    <Typography
                        variant="body2"
                        color={message === 'User registered successfully' ? 'green' : 'red'}
                        sx={{ marginTop: 2 }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Register;
