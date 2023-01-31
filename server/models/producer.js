import { Schema, model } from "mongoose";

const producerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, "Please provide a winery name longer than 2 characters"],
        maxlength: [50, "Please provide a winery name shorter than 50 characters"],
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Must match an email address"],
        required: false,
    },
    phone: {
        type: String,
        match: [/^\+?[0-9]{6,12}]/, "Please enter a phone number optionally starting with a + for international"],
        required: false,
    }
});

const Producer = model("Producer", producerSchema);

export default Producer;