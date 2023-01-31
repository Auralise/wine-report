import { Schema, model } from "mongoose";
import { getDateObject } from "../utils/dateFormat.js";


const commentSchema = new Schema({
    content: {
        type: String,
        minLength: 1,
        maxLength: 500,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => getDateObject(timestamp),
    }
});

const Comment = model("Comment", commentSchema);

export default Comment;