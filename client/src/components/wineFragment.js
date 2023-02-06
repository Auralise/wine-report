import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { styled } from '@mui/material/styles';

const Wine = styled(Paper)(() => ({
    backgroundColor: "#eee",
    padding: "1em",
    border: "solid 1px darkgrey",
    boxShadow: "3px 3px 3px #222",
    display: "flex",
}));

const imgStyle = {
    width: "auto",
    height: "height"
}

export default function WineFragment({ wine }) {
    return (
        <Link id={wine._id} href={`/wine/${wine._id}`} underline="none">
            <Wine>
                <img src="https://via.placeholder.com/150" alt="Placeholder for wine" style={imgStyle} />
                <Box ml={5} sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography component="h3"><strong>{wine.name}</strong></Typography>
                    <Typography component="p">{wine.vintage} - {wine.producer.name}</Typography>
                    <Typography component="p">{wine.category} - {wine.variety.name}</Typography>
                    <Typography component="p">{wine.region.name}</Typography>
                    {
                        wine.locationStorage.map((loc) => {
                            return <Typography component="p">Quantity: <strong>{loc.quantity}</strong> in <strong>{loc.location.locationRoom} - {loc.location.locationName}</strong></Typography>

                        })
                    }
                </Box>
            </Wine>
        </Link>
    )
}
