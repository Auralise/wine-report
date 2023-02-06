import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useMutation } from "@apollo/client";

import { ADD_VARIETY } from "../utils/mutations";

export default function AddVariety() {

    const [formContents, setFormContents] = useState({
        name: ""
    })

    const [addVariety, setAddVariety] = useMutation(ADD_VARIETY);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormContents({
            ...formContents,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        addVariety({
            variables: { ...formContents }
        })

        setFormContents({
            name: ""
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
                <Typography component="h2" variant="h3">Add a wine Variety</Typography>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name of wine variety"
                    required
                    autoFocus
                    margin="normal"
                    value={formContents.name}
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