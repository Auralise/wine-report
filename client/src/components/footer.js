import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Container component="footer" maxWidth="false" sx={{
            backgroundColor: "#b6bbbd",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: "0",
            padding: "1em 0"

        }}>

            <Typography component="h4" variant="h5">
                Wine Report - &copy; James Prince 2023
            </Typography>


        </Container>
    ) 
}