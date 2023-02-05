// Package imports
import React, {useState} from "react";
import { useMutation } from "@apollo/client";

// UI Component Imports
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

export default function Register() {
    const [registerFormState, setRegisterFormState] = useState({ name: "", email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [register, { error, data }] = useMutation(ADD_USER);

    //Handle the change of the elements on the form
    const handleChange = (event) => {
        const { name, value } = event.target;

        setRegisterFormState({
            ...registerFormState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await register({
                variables: { ...registerFormState }
            });

            //Reload page after saving token
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
            //todo: write error to 
        }

        setRegisterFormState({
            name: "",
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
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>

                <TextField
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormState.email}
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                />

                <TextField
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormState.email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    
                />

                <TextField
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormState.password}
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
                    }}>{errorMessage && (errorMessage)}
                </Typography>

                <Typography component="div">
                        Already have an account?  
                    <Link href="/" underline="always" sx={{ ml: "5px"}}>Sign In!</Link>
                </Typography>

            </Box>
            


        </Box>

    </Container>
    )
}