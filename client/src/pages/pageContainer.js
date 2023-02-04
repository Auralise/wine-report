import React, {useState} from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Auth from "../utils/auth";

// TODO: import other components
import HeaderContainer from "../components/header";


//Import pages to render
import Dashboard from "./dashboard";
import AddWine from "./addWine";
import Storage from "./storage";
import SearchResults from "./results";
import SingleWine from "./singleWine"

import LoginPage from "./login";
import Register from "./register";

export default function PageContainer() {
    const [currentPage, setCurrentPage] = useState("Home");

    

    const [searchTerms, setSearchTerms] = useState("");


    const renderPage = () => {
        switch(currentPage) {
            case "Dashboard": 
                return <Dashboard />
            case "Add":
                return <AddWine />
            case "Storage":
                return <Storage />
            case "Results":
                // Getting search results to pass as props
                return <SearchResults />
            default: 
                return <Dashboard />
        }
    }

    return (
        // currently using fragments, this can be made into a DOM element if needed for an overall wrapper
        <>
            <HeaderContainer currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Router>
                <Routes>
                    {Auth.loggedIn() ? (
                    <>
                        <Route 
                            path="/"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/results"
                            element={<SearchResults />}
                        />
                        <Route
                            path="/wine/:wineId"
                            element={<SingleWine />}
                        />

                    </>

                    ) : (
                        <>
                            <Route
                                path="/"
                                element={<LoginPage /> }
                            />
                            <Route
                                path="/signup"
                                element={<Register />}
                            />
                        </>
                    )}




                </Routes>

            </Router>    
            <footer>

            </footer>   
        </>
    )
}