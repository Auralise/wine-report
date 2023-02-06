import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useMutation } from "@apollo/client";

import { ADD_PRODUCER } from "../utils/mutations";

export default function AddProducer() {
    const [formContents, setFormContents] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const [addProducer, setAddProducer] = useMutation(ADD_PRODUCER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormContents({
            ...formContents,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        addProducer({
            variables: { ...formContents }
        })

        setFormContents({
            name: "",
            email: "",
            phone: ""
        })
    }

    return (
        <Container maxWidth="md">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1em",

                }}>
                <Typography component="h2" variant="h3">Add a wine producer</Typography>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Producer name"
                    required
                    autoFocus
                    margin="normal"
                    value={formContents.name}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    margin="normal"
                    value={formContents.email}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone number"
                    margin="normal"
                    value={formContents.phone}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"

                >
                    Submit
                </Button>
            </Box>
        </Container>
    )
}