import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useMutation } from "@apollo/client";

import { ADD_REGION } from "../utils/mutations";

export default function AddRegion() {
    const [formContents, setFormContents] = useState({
        name: "",
        country: "",
    })

    const [addRegion, setAddRegion] = useMutation(ADD_REGION);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormContents({
            ...formContents,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        addRegion({
            variables: { ...formContents }
        })

        setFormContents({
            name: "",
            country: ""
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
                <Typography component="h2" variant="h3">Add a wine region</Typography>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Region name"
                    required
                    autoFocus
                    margin="normal"
                    value={formContents.name}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    id="country"
                    name="country"
                    label="Country"
                    margin="normal"
                    required
                    value={formContents.country}
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