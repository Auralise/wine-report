import { Schema, model } from "mongoose";

const regionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: "Please provide a unique region name",
        minlength: [3, "Please provide a region name longer than 3 characters"],
        maxlength: [50, "Please shorten the region name to below 50 characters"]
    },
    country: {
        type: String,
        required: true,
        default: "Australia",
        minlength: [2, "Please provide a country name longer than two characters"],
        maxlength: [40, "Please shorten the country name to below 40 characters"]
    }
});

const Region = model("Region", regionSchema);

export default Region;