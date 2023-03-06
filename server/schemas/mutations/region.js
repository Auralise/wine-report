import { GraphQLError } from "graphql";
import { Region } from "../../models/index.js";

export const addRegion = async (parent, {name, country}, context ) => {
    if (context.user) {
        try {
            if (!name || name.length < 3 || name.length > 50) {
                throw new Error("Please provide a name for the region between 3 and 50 characters in length");
            }

            if (!country || country.length < 3 || country.length > 50) {
                throw new Error("Please provide a country name or country code between 2 and 50 characters long");
            }

            const region = await Region.create({
                name: name,
                country: country,
            });

            return region;


        } catch (e) {
            throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
        }
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}

export const updateRegion = async (parent, {name, country}, context) => {
    throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
}