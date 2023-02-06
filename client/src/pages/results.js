import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { useQuery } from "@apollo/client";

import { useSearchParams } from "react-router-dom";

import { SEARCH_WINE } from "../utils/queries";
import WineFragment from "../components/wineFragment";




export default function SearchResults() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("term") || "";
    

    // eslint-disable-next-line no-unused-vars
    const { loading, data, error } = useQuery(SEARCH_WINE, {
        variables: {
            searchTerm,
        }
    });

    // console.log(data);

    if (error) console.log(JSON.stringify(error, null, 2));
    
    let wines;
    data ? wines = data.wine : wines = [] ;
    
    // console.log(wines);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <CssBaseline />
                <Typography component="h2">Loading...</Typography>
            </Container>
        )

    } else {
        return (
            <Container maxWidth="lg" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2.5em"
            }}
            >
            <Box  sx={{ flexGrow: "1"}}>
                <Grid container spacing={2}>
                    {wines.length > 0 ? wines.map((wine) => {
                        return (
                            <Grid item lg={6} sm={12}>
                                <WineFragment wine={wine} />
                            </Grid>
                        )
                    }) :
                        <Grid item>
                            <Typography component="h2" variant="h2">No wines found matching you search term!</Typography>
                            <Link href="/results"><Typography>View all wines?</Typography></Link>
                        </Grid>
                    }
                </Grid>
            </Box>
            </Container>
        )
    }
}