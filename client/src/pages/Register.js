import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    // Form state
    const [inputs, setInput] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Handle input change
    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/register', { username: inputs.name, email: inputs.email, password: inputs.password })
            if (data.success) {
                alert('User Register Successfully ')
                navigate('/login')

            }
        } catch (error) {
            console.log(error)

        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                maxWidth={450}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="auto"
                padding={3}
                boxShadow={3}
                borderRadius={2}
                mt={5}
            >
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={inputs.email}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Submit
                </Button>
                <Button
                    onClick={() => navigate('/login')}
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Already registered? Login
                </Button>
            </Box>
        </form>
    );
};

export default Register;
