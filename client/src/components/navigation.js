import React, {useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import CssBaseline from "@mui/material/CssBaseline";


import Auth from "../utils/auth";

export default function Navigation() {
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
                gap: "1.5em"
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
                            variant="contained"
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
                            <MenuItem href="/add-wine"><strong>Add Wine</strong></MenuItem>
                            <MenuItem href="/add-producer">Add Producer</MenuItem>
                            <MenuItem href="/add-region">Add Region</MenuItem>
                            <MenuItem href="/add-storage">Add Storage</MenuItem>
                            <MenuItem hrew="/add-variety">Add Variety</MenuItem>
                        </Menu>
                        <Button 
                            href="/search"
                            sx={{
                                flex: "1 1"
                            }}
                            variant="contained"
                        >
                            Advanced Search
                        </Button>

                        <Button
                            href="/"
                            onClick={() => {
                                //set the page state back to login
                                Auth.logout();
                            }}
                            sx={{
                                flex: "1 1",
                            }}
                            variant="contained"
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
                            variant="contained"
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