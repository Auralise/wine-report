// Package imports
import React from "react";

// UI component imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CssBaseline  from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

// import logo image
import logo from "../images/logo.png";

const logoStyle = {
    marginTop: "5px",
    width: "10vw",
    maxWidth: "125px",
    height: "auto"
}

export default function Header() {
    const matches = useMediaQuery("(max-width: 800px)", {noSsr: true});
    return (
        
            <Container component="div" maxWidth="lg">
                <CssBaseline />
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                >
                    <Link href="/" underline="none">
                        <img id="main-logo" src={logo} alt="Wine Report"  style={logoStyle}/>
                    </Link>


                    {matches ?
                        <Typography component="h1" variant="h1" sx={{
                            fontSize: "12vw",
                            ml: 1
                        }}>
                            Wine Report
                        </Typography>
                        :
                        <Typography component="h1" variant="h1" sx={{
                            ml: 1
                        }}>
                            Wine Report
                        </Typography>
                    }
                    

                </Box>

            </Container>
        
        
    )



}