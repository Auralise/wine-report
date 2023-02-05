// Package imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

// UI Component imports
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// local deps
import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";


export default function LoginPage() {
    const [loginFormState, setLoginFormState] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [login, { error, data }] = useMutation(LOGIN);

    //Handle the change of the elements on the form
    const handleChange = (event) => {
        const { name, value } = event.target;

        setLoginFormState({
            ...loginFormState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...loginFormState }
            });

            //Reload page after saving token
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
            setErrorMessage(e.message);
            //todo: write error to 
        }

        setLoginFormState({
            email: "",
            password: ""
        });

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography component="h1" variant="h4">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        value={loginFormState.email}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        value={loginFormState.password}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt:2, mb: 2}}
                    >
                        Sign In
                    </Button>

                    <Typography component="div" sx={{
                            color: "red",
                            minHeight: "1em"
                        }}
                    >
                            {errorMessage && (errorMessage)}
                    </Typography>

                    <Typography component="div">
                        Don't have an account?  
                    <Link href="/register" underline="always" sx={{ ml: "5px"}}>Sign up!</Link>
                    </Typography>

                </Box>
                


            </Box>

        </Container>
    )




}