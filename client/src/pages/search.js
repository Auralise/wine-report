import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Imports are here for when search is expanded to allow the user to target other attributes with search terms. 
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormLabel from "@mui/material/FormLabel"

export default function Search() {
  const [searchState, setSearchState] = useState({
    term: "",
  });

  const handleSearchChange = (event) => {
    setSearchState({term: event.target.value});
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const queryString = new URLSearchParams({...searchState});
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
          value={searchState.term}
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