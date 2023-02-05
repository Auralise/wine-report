import React from "react";
import Container from "@mui/material/Container";

import WineFragment from "../components/wineFragment";

const sampleWine = {   
          "_id": "63dc6cc0ecc96ad4a2a91512",
          "name": "Tussy Mussy",
          "vintage": 2019,
          "variety": {
            "_id": "63dc5a338f74cb614035193f",
            "name": "Pinot Noir"
          },
          "region": {
            "_id": "63dc59cf5eaaf17855090cb8",
            "name": "Mornington Peninsula",
            "country": "Australia"
          },
          "producer": {
            "_id": "63dc5c1b50e8d7cd0c6755db",
            "name": "Queely",
            "email": "Kathleen@queely.com.au",
            "phone": "12345678"
          },
          "comments": [],
          "locationStorage": [
            {
              "location": {
                "_id": "63dc58559d5b1a47097e328a",
                "locationName": "K-2",
                "locationRoom": "Kitchen",
                "description": null
              },
              "quantity": 10
            }
          ],
          "category": "Red"
}

export default function Dasboard () {

    return (
        <Container>
            <WineFragment wine={sampleWine} />
        </Container>
    )
}