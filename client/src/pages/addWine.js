import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";


import { ADD_WINE } from "../utils/mutations";
import { GET_ALL_PRODUCERS, GET_ALL_REGIONS, GET_ALL_STORAGE_LOCATIONS, GET_ALL_VARIETIES } from "../utils/queries";

import { useMutation, useQuery } from "@apollo/client";

export default function AddWine() {

    const [formContents, setFormContents] = useState({
        name: "",
        region: "",
        category: "Red",
        producer: "",
        location: "",
        quantity: "",
        vintage: "",
        variety: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const [addWine, { data: wineData }] = useMutation(ADD_WINE);

    const { loading: varietyLoading, data: varietyData, error: varietyError } = useQuery(GET_ALL_VARIETIES);
    const { loading: producerLoading, data: producerData, error: producerError } = useQuery(GET_ALL_PRODUCERS);
    const { loading: storageLoading, data: storageData, error: storageError } = useQuery(GET_ALL_STORAGE_LOCATIONS);
    const { loading: regionLoading, data: regionData, error: regionError } = useQuery(GET_ALL_REGIONS);

    console.log(storageData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormContents({
            ...formContents,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const vintage = parseInt(formContents.vintage);
            if(isNaN(vintage)) throw new Error("Vintage must be an integer");

            const quantity = parseInt(formContents.quantity);
            if(isNaN(quantity)) throw new Error("Quantity must be an integer");

            console.log(vintage);
            addWine({
                variables: { 
                    ...formContents,
                    vintage,
                    quantity
                 }
            });

            window.location.assign(`/wine/${wineData.addWine._id}`);
        } catch (e) {
            console.log(JSON.stringify(e, null, 2))
            setErrorMessage(e.message);
        }
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
                    id="name"
                    name="name"
                    label="Name of wine"
                    required
                    autoFocus
                    margin="normal"
                    value={formContents.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    id="vintage"
                    name="vintage"
                    label="Vintage"
                    margin="normal"
                    required
                    value={formContents.vintage}
                    onChange={handleChange}
                />
                {regionLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={20} />
                ) : (

                    <FormControl fullWidth>
                        <InputLabel id="region-select-label">Region</InputLabel>
                        <Select
                            labelId="region-select-label"
                            id="region"
                            name="region"
                            value={formContents.region}
                            onChange={handleChange}
                            required
                        >
                            {
                                regionData.regions.map((region) => {
                                    return <MenuItem key={region._id} value={region._id}>{region.name}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                )}

                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category"
                        name="category"
                        value={formContents.category}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                        <MenuItem value="Sparkling">Sparkling</MenuItem>
                        <MenuItem value="Rose">Rose</MenuItem>
                        <MenuItem value="Fortified">Fortified</MenuItem>
                        <MenuItem value="Dessert">Dessert</MenuItem>

                    </Select>
                </FormControl>

                {varietyLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={20} />
                ) : (

                    <FormControl fullWidth>
                        <InputLabel id="variety-select-label">Variety</InputLabel>
                        <Select
                            labelId="variety-select-label"
                            id="variety"
                            name="variety"
                            value={formContents.variety}
                            onChange={handleChange}
                            required
                        >
                            {
                                varietyData.varieties.map((variety) => {
                                    return <MenuItem key={variety._id} value={variety._id}>{variety.name}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                )}


                {producerLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={20} />
                ) : (

                    <FormControl fullWidth>
                        <InputLabel id="producer-select-label">Producer</InputLabel>
                        <Select
                            labelId="producer-select-label"
                            id="producer"
                            name="producer"
                            value={formContents.producer}
                            onChange={handleChange}
                            required
                        >
                            {
                                producerData.producers.map((producer) => {
                                    return <MenuItem key={producer._id} value={producer._id}>{producer.name}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                )}

                {storageLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={20} />
                ) : (

                    <FormControl fullWidth>
                        <InputLabel id="storage-select-label">Storage Location</InputLabel>
                        <Select
                            labelId="storage-select-label"
                            id="location"
                            name="location"
                            value={formContents.location}
                            onChange={handleChange}
                            required
                        >
                            {
                                storageData.storage.map((storage) => {
                                    return <MenuItem key={storage._id} value={storage._id}>{storage.locationName} in {storage.locationRoom}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                )}




                <TextField
                    fullWidth
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    margin="normal"
                    required
                    value={formContents.quantity}
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