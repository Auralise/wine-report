import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useMutation } from "@apollo/client";

import { ADD_STORAGE } from "../utils/mutations";

export default function AddStorage() {
    const [formContents, setFormContents] = useState({
        locationName: "",
        locationRoom: "",
        description: ""
    })

    const [addStorage, setAddStorage] = useMutation(ADD_STORAGE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormContents({
            ...formContents,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        addStorage({
            variables: { ...formContents }
        })

        setFormContents({
            locationName: "",
            locationRoom: "",
            description: ""
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
                <Typography component="h2" variant="h3">Add a wine Storage Location</Typography>
                <TextField
                    fullWidth
                    id="locationName"
                    name="locationName"
                    label="Name of storage location"
                    required
                    autoFocus
                    margin="normal"
                    value={formContents.locationName}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    id="locationRoom"
                    name="locationRoom"
                    label="Storage room"
                    margin="normal"
                    required
                    value={formContents.locationRoom}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    margin="normal"
                    required
                    value={formContents.description}
                    onChange={handleChange}
                    multiline
                    maxRows={5}
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