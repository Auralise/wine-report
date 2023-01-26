import React, {useState} from "react";

// TODO: Import state context


// TODO: import other components
import HeaderContainer from "./components/header";


//Import pages to render
import Dashboard from "./dashboard";
import AddWine from "./addWine";
import Storage from "./storage";
import SearchResults from "./searchResults";


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

            <main>

            </main>
            <footer>

            </footer>
        </>
    )
}