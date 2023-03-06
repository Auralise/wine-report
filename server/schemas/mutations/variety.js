import { GraphQLError } from "graphql";
import { Variety } from "../../models/index.js";

export const addVariety = async (parent, {name}, context) => {
    if (context.user) {
        try {
            if (name.length < 2 || name.length > 50) {
                throw new Error("Please provide a name for the Variety between 2 and 50 characters in length");
            }

            const variety = await Variety.create({
                name
            });

            return variety;

        } catch (e) {
            throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
        }
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

}

export const updateVariety = async (parent, { varietyId, name}, context) => {
    throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });

}