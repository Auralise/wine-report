import React from "react";

// import nav component to be used in header
import Navigation from "./navigation";

// import logo image
import logo from "../images/logo.png";

export default function HeaderContainer({currentPage, setCurrentPage}) {


    return (
        <>
        <button class="logoBtn" onClick={setCurrentPage("Home")}>
            <img id="main-logo" src={logo} alt="Wine Report" height="200px" width="auto"/>
        </button>
        
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        </>
    )



}