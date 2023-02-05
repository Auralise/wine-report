import React, {useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import CssBaseline from "@mui/material/CssBaseline";

import Auth from "../utils/auth";

export default function Navigation({ currentPage, setCurrentPage }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    return (
        <Container component="nav" maxWidth="lg">
            <CssBaseline />
            <Box component="ul" sx={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-evenly",
                padding: "5px 0",
                border: "solid"
            }}>
                {Auth.loggedIn() ? (
                    <>
                        <Button
                            id="menu-button"
                            aria-controls={open ? "menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            sx={{
                                flex: "1 1",
                            }}
                        >
                            My Cellar
                        </Button>
                        <Menu
                            id="menu"
                            MenuListProps={{
                                "aria-labelledby": "menu-button"
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            sx={{
                                padding: "0 10px",
                            }}
                        >
                            <MenuItem href="/view-producer" onClick={setCurrentPage("ViewProducer")}>View Producer</MenuItem>
                            <MenuItem href="/view-region" onClick={setCurrentPage("ViewRegion")}>View Region</MenuItem>
                            <MenuItem href="/view-storage" onClick={setCurrentPage("ViewStorage")}>View Storage</MenuItem>
                            <MenuItem href="/view-variety" onClick={setCurrentPage("ViewVariety")}>View Variety</MenuItem>
                            <Divider />
                            <MenuItem href="/add-wine" onClick={setCurrentPage("AddWine")}><strong>Add Wine</strong></MenuItem>
                            <MenuItem href="/add-producer" onClick={setCurrentPage("AddProducer")}>Add Producer</MenuItem>
                            <MenuItem href="/add-region" onClick={setCurrentPage("AddRegion")}>Add Region</MenuItem>
                            <MenuItem href="/add-storage" onClick={setCurrentPage("AddStorage")}>Add Storage</MenuItem>
                            <MenuItem hrew="/add-variety" onClick={setCurrentPage("AddVariety")}>Add Variety</MenuItem>
                        </Menu>
                        <Button 
                            href="/search"
                            onClick={setCurrentPage("AdvancedSearch")}
                        >Advanced Search</Button>

                        <Button
                            href="/"
                            onClick={() => {
                                //set the page state back to login
                                setCurrentPage("Login");
                                Auth.logout();
                            }}
                            sx={{
                                flex: "1 1",
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            href="/"
                            sx={{
                                flex: "1 1",
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            href="/register"
                            sx={{
                                flex: "1 1",
                            }}
                        >
                            Register
                        </Button>

                    </>
                )
                }
            </Box>
        </Container>
    )

}