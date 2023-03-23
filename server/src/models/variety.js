import { Schema, model } from "mongoose";

const varietySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Please provide a variety name longer than 2 characters"],
        maxlength: [50, "Please provide a variety name shorter than 50 characters"]
    }
});

const Variety = model("Variety", varietySchema);

export default Variety;