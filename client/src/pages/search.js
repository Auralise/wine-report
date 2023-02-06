import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Search() {
  const [searchState, setSearchState] = useState("");

  const handleSearchChange = (event) => {
    setSearchState(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const queryString = new URLSearchParams({term: `${searchState}`});
    console.log(queryString.toString());
    window.location.assign(`/results?${queryString.toString()}`)
  }


  return (
    <Container maxWidth="lg">
      <Box component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "1em"

        }}
        onSubmit={handleSearchSubmit}
      >
        <Typography component="h2" variant="h2">Search wines in your cellar</Typography>
        <TextField
          fullWidth
          margin="normal"
          onChange={handleSearchChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Search
        </Button>
      </Box>
      <Typography component="h2" variant="h3" mt={5} mb={3} textAlign="center">
        Other actions
      </Typography>
      <Box
        component="div"
        sx={{ 
          display: "flex",
          justifyContent: "center",
          gap: "1em"
         }}
      >
        <Button
          variant="contained"
          href="/add-wine"
        >
          Add Wine
        </Button>
        <Button
          variant="contained"
          href="/add-producer"
        >
          Add Producer
        </Button>
        <Button
          variant="contained"
          href="/add-region"
        >
          Add Region</Button>
        <Button
          variant="contained"
          href="/add-variety"
        >
          Add Variety
        </Button>
        <Button
          variant="contained"
          href="/add-storage"
        >
          Add Storage Location
        </Button>

      </Box>

    </Container>
  )
}