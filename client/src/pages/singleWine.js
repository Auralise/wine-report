import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { styled } from '@mui/material/styles';

import { UPDATE_STORAGE_QUANTITY, ADD_COMMENT } from "../utils/mutations";
import { GET_SINGLE_WINE } from "../utils/queries";


const LocationStorage = styled(Paper)(() => ({
    backgroundColor: "#eee",
    padding: "1em",
    border: "solid 1px darkgrey",
    boxShadow: "3px 3px 3px #222",
}));
const CommentBox = styled(Paper)(() => ({
    backgroundColor: "#efefef",
    padding: "1em",
    border: "solid 1px darkgrey",
    boxShadow: "3px 3px 3px #222",
}));

const imgStyle ={
    height: "250px",
    width: "auto",
}

export default function SingleWine() {
    const [commentContent, setCommentContent] = useState("");

    
    const [updatedStorageItem, storageItemMutiationObj] = useMutation(UPDATE_STORAGE_QUANTITY, {
        refetchQueries: [
            {query: GET_SINGLE_WINE},
            "getSingleWine"
        ],
        
    });

    const [addComment, addCommentMutationObj] = useMutation(ADD_COMMENT, {
        refetchQueries: [
            {query: GET_SINGLE_WINE},
            "getSingleWine"
        ]
    });
    
    //Print error
    // if (storageItemMutiationObj.error) {
    //     console.log(JSON.stringify(storageItemMutiationObj.error, null, 2));
        
    // }
    
    // if (addCommentMutationObj.error){
    //     console.log(JSON.stringify(addCommentMutationObj.error, null, 2));

    // }

    const { wineId } = useParams();
    
    
    const { loading, data } = useQuery(GET_SINGLE_WINE, {
        variables: { id: wineId }
    });
    const wine = data?.specificWine || {};

    // console.log(wine);
    
    const handleCommentChange = (event) => {
        const {value} = event.target;
        setCommentContent(value);
    }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        addComment({
            variables: {
                contents: commentContent,
                wineId
            }
        });

        setCommentContent("");

    }

    const handleIncreaseQuantity = async (event) => {
        try {
            const quantity = 1;
            const locationId = event.target.getAttribute("data-locationid");
            updatedStorageItem({variables: {
                wineId,
                storageId: locationId,
                quantityChange: quantity
            }});
        } catch (e) {
            console.error(e);
        }
    }

    const handleDecreaseQuantity = async (event) => {
        event.preventDefault();
        try {
            const quantity = -1;
            const locationId = event.target.getAttribute("data-locationid");
            updatedStorageItem({variables: {
                wineId,
                storageId: locationId,
                quantityChange: quantity
            }});
            // console.log(storageItemMutiationObj.error);
        } catch (e) {
            console.error(e);
        }
    }


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
                flexWrap: "wrap"

            }}>
                <CssBaseline />
                {wine && (
                    <>
                        <img src="https://via.placeholder.com/250" alt="Placeholder for wine" style={imgStyle}/>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "3em",
                            flex: "1 0 33%"

                        }}>
                            <Typography component="h2" variant="h2">{wine.name}</Typography>
                            <Typography component="p" variant="h5">{wine.vintage} - {wine.producer.name}</Typography>
                            <Typography component="p" variant="h5">{wine.category} - {wine.variety.name}</Typography>
                            <Typography component="p" variant="h5" mb={3}>{wine.region.name}</Typography>
                            {
                                wine.locationStorage.map((loc) => {
                                    return <LocationStorage key={`${loc.location._id}`}>
                                        <Typography
                                            component="p"
                                        >
                                            Quantity: <strong>{loc.quantity}</strong>
                                        </Typography>
                                        <Typography component="p"> <strong>{loc.location.locationRoom} - {loc.location.locationName}</strong>
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",
                                            gap: "2em"

                                        }}>
                                            <Button onClick={handleDecreaseQuantity} data-locationid={`${loc.location._id}`} variant="contained">
                                                -
                                            </Button>
                                            <Button onClick={handleIncreaseQuantity} data-locationid={`${loc.location._id}`} variant="contained">
                                                +
                                            </Button>

                                        </Box>
                                    </LocationStorage>
                                })
                            }




                        </Box>
                        {/* Comment Column */}
                        <Box ml={5} sx={{flex: "1 0 33%"}}>
                            <Typography component="h3" variant="h3" mt={5}>Comments</Typography>
                            <Box id="comment-container">
                                {wine.comments.map((comment) => {
                                    return <CommentBox key={`${comment._id}`} sx={{
                                        margin: "1em"
                                    }}>
                                        <Typography component="p">{comment.content}</Typography>
                                        <hr />
                                        <Typography component="p"><strong>{comment.createdAt}</strong> by {comment.author.name}</Typography>
                                    </CommentBox>
                                })}
                            </Box>
                            <Box component="form" onSubmit={handleCommentSubmit} noValidate mt={5}>
                                <TextField 
                                    id="commentContent"
                                    label="Comment"
                                    multiline
                                    fullWidth
                                    maxRows={4}
                                    value={commentContent}
                                    onChange={handleCommentChange}
                                />

                                <Button 
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt:2, mb:2}}
                                >
                                    Post
                                </Button>
                                
                            </Box>
                        </Box>

                    </>
                )}

            </Container>

        )
    }
}   