import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";



export default function Navigation({currentPage, setCurrentPage}){

//TODO: Add conditional rendering to show these options only if logged in
//TODO: Additionally, possibly convert these to NavLinks from react router 
//NOTE: Current items in this file are placeholders to allow for something to display during development and are going to be changed
    return (
        <Container component="nav" maxWidth="lg">
            <Box component="ul" sx={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-evenly"
            }}>
                <li>
                    <a 
                    href="#add" 
                    onClick={() => setCurrentPage("Add")}
                    className={currentPage === "Add" ? "nav-link active" : "nav-link"}
                    >
                        Add Wine
                    </a>
                </li>

                <li>
                    <a 
                    href="#storage"
                    onClick={()=> setCurrentPage("Storage")}
                    className={currentPage === "Storage" ? "nav-link active" : "nav-link"}
                    >
                        Storage
                    </a>
                </li>

                <li>
                    <a 
                    href="#reports"
                    onClick={()=> setCurrentPage("Reports")}
                    className={currentPage === "Reports" ? "nav-link active" : "nav-link"}
                    >
                        Reports
                    </a>
                </li>

                <li>
                    <a
                    href="#logout"
                    onClick={() => setCurrentPage("Logout")}
                    >
                        Logout
                    </a>
                </li>

                <li>
                    <a
                    href="#login"
                    onClick={() => setCurrentPage("Login")}
                    className={currentPage === "Login" ? "nav-link active" : "nav-link"}

                    >
                        Login
                    </a>
                </li>
            </Box>
        </Container>
    )

}