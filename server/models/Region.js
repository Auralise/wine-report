import { Schema, model } from "mongoose";

const regionSchema = new Schema({
    regionName: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, "Please provide a region name longer than two characters"],
        maxlength: [40, "Please shorten the region name to below 40 characters"]
    },
    countryName: {
        type: String,
        required: true,
        default: "Australia",
        minlength: [2, "Please provide a country name longer than two characters"],
        maxlength: [40, "Please shorten the country name to below 40 characters"]
    }
});

const Region = model("Region", regionSchema);

export default Region;