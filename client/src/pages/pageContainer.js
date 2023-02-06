import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Auth from "../utils/auth";

// TODO: import other components
import Header from "../components/header";
import Navigation from "../components/navigation";
import Footer from "../components/footer";


//Import pages to render
import Search from "./dashboard";
import AddStorage from "./addStorage";
import SearchResults from "./results";
import SingleWine from "./singleWine"

import AddWine from "./addWine";
import AddProducer from "./addProducer";
import AddVariety from "./addVariety";
import AddRegion from "./addRegion";

import LoginPage from "./login";
import Register from "./register";

export default function PageContainer() {

    const [searchTerms, setSearchTerms] = useState("");

    return (
        // currently using fragments, this can be made into a DOM element if needed for an overall wrapper
        <>
            <Container component="header" maxWidth="false" sx={{
                backgroundColor: "#A9DEF9",
                width: "100%",
            }}>
                <Header />
                <Navigation />
            </Container>
            {/* Fix for the sticky footer */}
            <Box mb={10}> 
            <Router>
                <Routes>
                    {Auth.loggedIn() ? (
                        <>
                            <Route
                                path="/"
                                element={<Search />}
                            />
                            <Route
                                path="/results"
                                element={<SearchResults />}
                            />
                            <Route
                                path="/wine/:wineId"
                                element={<SingleWine />}
                            />
                            <Route
                                path="/add-storage"
                                element={<AddStorage />}
                            />
                            <Route
                                path="/add-wine"
                                element={<AddWine />}
                            />
                            <Route
                                path="/add-producer"
                                element={<AddProducer />}
                            />
                            <Route
                                path="/add-region"
                                element={<AddRegion />}
                            />
                            <Route
                                path="/add-variety"
                                element={<AddVariety />}
                            />

                            <Route
                                path="/view-variety"
                                element={<AddVariety />}
                            />
                            <Route
                                path="/add-variety"
                                element={<AddVariety />}
                            />
                            <Route
                                path="/add-variety"
                                element={<AddVariety />}
                            />


                        </>

                    ) : (
                        <>
                            <Route
                                path="/"
                                element={<LoginPage />}
                            />
                            <Route
                                path="/register"
                                element={<Register />}
                            />
                            <Route
                                path="*"
                                element={<LoginPage />}
                            />
                        </>
                    )}




                </Routes>

            </Router>
            </Box>
            <Footer />
        </>
    )
}