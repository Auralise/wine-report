import React, {useState} from "react";

// TODO: Import state context


// TODO: import other components

import HeaderContainer from "./components/header"

export default function PageContainer() {
    const [currentPage, setCurrentPage] = useState("Home");
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