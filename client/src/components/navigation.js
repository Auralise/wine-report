import React, {useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Link from "@mui/material/Link";
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
                            <Link href="/add-wine" underline="none" sx={{color: "black"}}><MenuItem><strong>Add Wine</strong></MenuItem></Link>
                            <Link href="/add-producer" underline="none" sx={{color: "black"}}><MenuItem>Add Producer</MenuItem></Link>
                            <Link href="/add-region" underline="none" sx={{color: "black"}}><MenuItem>Add Region</MenuItem></Link>
                            <Link href="/add-storage" underline="none" sx={{color: "black"}}><MenuItem>Add Storage</MenuItem></Link>
                            <Link href="/add-variety" underline="none" sx={{color: "black"}}><MenuItem>Add Variety</MenuItem></Link>
                        </Menu>
                        <Button 
                            href="/"
                            sx={{
                                flex: "1 1"
                            }}
                            variant="contained"
                        >
                            Search
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
                            variant="contained"
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