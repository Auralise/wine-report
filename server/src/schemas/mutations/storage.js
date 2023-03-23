import { GraphQLError } from "graphql";
import { Storage } from "../../models/index.js";

export const addStorage = async (parent, { locationName, locationRoom, description }, context) => {
    if (context.user) {
        if (!locationName || locationName.length < 2 || locationName.length > 50) {
            throw new GraphQLError("Please provide a location name longer than 2 characters but less than 50", { extensions: { code: "VALIDATION_ERROR" } });
        }

        if (!locationRoom || locationRoom.length < 2 || locationName.length > 50) {
            throw new GraphQLError("Please provide a room name longer thant 2 charcaters and less than 50", { extensions: { code: "VALIDATION_ERROR" } });
        }

        if (description && description.length > 500) {
            throw new GraphQLError("Please provide a description shorter than 500 chracters", { extensions: { code: "VALIDATION_ERROR" } });
        }

        const newStorage = await Storage.create({
            locationName,
            locationRoom,
            description
        })

        return newStorage;

    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

}

