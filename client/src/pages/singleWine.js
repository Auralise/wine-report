import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import { styled } from '@mui/material/styles';


import { GET_SINGLE_WINE } from "../utils/queries";


const LocationStorage = styled(Paper)(() => ({
    backgroundColor: "#eee",
    padding: "1em",
    border: "solid 1px darkgrey",
    boxShadow: "3px 3px 3px #222",
}));

export default function SingleWine() {

    const { wineId } = useParams();

    console.log("wine id: ", wineId);
    const { loading, data, error } = useQuery(GET_SINGLE_WINE, {
        variables: { id: wineId }
    });
    console.log(JSON.stringify(error, null, 2))
    console.log("data: ", data);
    const wine = data?.specificWine || {};

    console.log("Wine: ", wine)

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <CssBaseline />
                <Typography component="h2">Loading...</Typography>
            </Container>
        )
    } else {
        return (

            <Container maxWidth="lg" sx={{
                display: "flex",

            }}>
                <CssBaseline />
                {wine && (
                    <>
                        <img src="https://via.placeholder.com/250" alt="Placeholder for wine" />
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "3em"
                        }}>
                            <Typography component="h2" variant="h2">{wine.name}</Typography>
                            <Typography component="p" variant="h5">{wine.vintage} - {wine.producer.name}</Typography>
                            <Typography component="p" variant="h5">{wine.category} - {wine.variety.name}</Typography>
                            <Typography component="p" variant="h5" mb={3}>{wine.region.name}</Typography>
                            {
                                wine.locationStorage.map((loc) => {
                                    return <LocationStorage key={`${loc.location._id}`}>
                                        <Typography
                                            component="p"
                                        >
                                            Quantity: <strong>{loc.quantity}</strong>
                                        </Typography>
                                        <Typography component="p"> <strong>{loc.location.locationRoom} - {loc.location.locationName}</strong>
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",

                                        }}>
                                            <Button>
                                                -
                                            </Button>
                                            <Button>
                                                +
                                            </Button>
                                        </Box>
                                    </LocationStorage>
                                })
                            }



                        </Box>
                    </>
                )}

            </Container>

        )
    }
}   