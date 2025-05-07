import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/store";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // Form state
    const [inputs, setInput] = useState({
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
            // Send login request to the server
            const { data } = await axios.post('/api/v1/user/login', { email: inputs.email, password: inputs.password })
            if (data.success) {
                dispatch(authAction.login())
                // If login is successful, show alert and navigate
                alert('User Login Successfully ')
                navigate('/')

            }
        } catch (error) {
            console.log(error)
            // Handle error if login fails
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
                    Login
                </Typography>
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
                    onClick={() => navigate('/register')}
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Not a user? Register
                </Button>
            </Box>
        </form>
    );
};

export default Login;
