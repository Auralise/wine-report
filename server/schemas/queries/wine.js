import { GraphQLError } from "graphql";
import { Wine } from "../../models/index.js";

//TODO: A significant amount of searching and filtering needs to be done by this method which is currently not functional. A basic outline is done but further work needs to be done to make this work. 
export const searchWine = async (parent, { searchTerm, type }, context) => {
    if (context.user) {
        let results;
        let query;

        // if (searchTerm && !type || !searchTerm && type) {
        //     throw new GraphQLError("Please provide a search term and a type or neither to get all wines", { extensions: { code: "BAD_REQUEST" } });
        // }
        
        //Type has been hard coded for the time being but the structure is defined for 
        let tempType

        if (searchTerm) {
            query = new RegExp(searchTerm.toLowerCase(), "i");
            tempType = "name";
        }
        
        if (tempType) {
            if (
                !tempType === "name" &&
                !tempType === "region" &&
                !tempType === "producer" &&
                !tempType === "vintage" &&
                !tempType === "category" &&
                !tempType === "variety" &&
                !tempType === "location"
            ) {
                throw new GraphQLError("Invalid search type", { extensions: { code: "BAD_REQUEST" } });
            }
        }
        // Currently only the name case works. This is here for futhrer development
        switch (tempType) {
            case "name": 
                results = await Wine.find({
                    name: { $regex: query }
                }).populate("variety region producer locationStorage.location comments.author");
                break;
            case "Region":
                const regionIds = getIds(await Region.find({ name: query }));

                results = await Wine.find({
                    region: { $in: regionIds },
                }).populate("variety region producer locationStorage.location comments.author");
                break;

            case "Producer":
                const producerIds = getIds(await Region.find({ name: query }));

                results = await Wine.find({
                    producer: { $in: producerIds },
                }).populate("variety region producer locationStorage.location comments.author");
                break;

            case "Vintage":
                results = await Wine.find({
                    vintage: { $regex: query },
                }).populate("variety region producer locationStorage.location comments.author");
                break;

            case "Category":
                results = Wine.find({
                    category: { $regex: query },
                }).populate("variety region producer locationStorage.location comments.author");
                break;

            case "Variety":
                const varietyIds = getIds(await Variety.find({ name: { $regex: query } }));
                results = Wine.find({
                    variety: { $in: varietyIds },
                }).populate("variety region producer locationStorage.location comments.author");
                break;

            case "Location":
                const location = await Location.find({ locationName: { $regex: query } });

                results = Wine.find({
                    locationStorage: { location: location._id },
                }).populate("variety region producer locationStorage.location comments.author");
                break;

            default:
                //Find all wine
                results = Wine.find({}).populate("variety region producer locationStorage.location comments.author");
        }

        return results;
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

}

export const getSpecificWine = async (parent, { id }, context) => {
    if (context.user) {
        const wine = Wine.findById(id);
        console.log(context.user);
        if (!wine) {
            throw new GraphQLError("No wine found by this ID", { extensions: { code: "NOT_FOUND" } });
        }

        return await wine.populate("variety region producer locationStorage.location comments.author");
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}