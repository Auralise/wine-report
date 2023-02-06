import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled } from '@mui/material/styles';

const Comment = styled(Paper)(() => ({
    backgroundColor: "#eee",
    padding: "1em",
    border: "solid 1px darkgrey",
    boxShadow: "3px 3px 3px #222",
    display: "flex",
}));

export default function CommentFragment({comment}) {
    const paragraphs = comment.content.split("\n");
    return (
        <Comment key={comment._id} id={comment._id}>
            <Typography component="p"><strong>{comment.author.name}</strong> at {comment.createdAt}</Typography>
            <hr />
            {
                paragraphs.map((text) => <Typography component="p">{text}</Typography>)
            }

        </Comment>
    )
}