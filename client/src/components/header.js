import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// import nav component to be used in header
import Navigation from "./navigation";

// import logo image
import logo from "../images/logo.png";

export default function HeaderContainer({currentPage, setCurrentPage}) {


    return (
        
        <Container component="header" maxWidth="false" sx={{
            backgroundColor: "#A9DEF9",
            width: "100%",
        }}>
            <Container component="div" maxWidth="lg">
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border:"solid"
                
            }}
            >
                <Link href="/" underline="none">
                    <img id="main-logo" src={logo} alt="Wine Report" height="200px" width="auto"/>
                </Link>

                <Typography component="h1" variant="h1">
                    Wine Report
                </Typography>
                
            </Box>
                <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </Container>
        </Container>
        
    )



}