import { GraphQLError } from "graphql";
import { Variety } from "../../models/index.js";

export const getStorage = async(parent, { id, locationName }, context) => {
    if (context.user) {
        let storage;
        if (id) {
            storage = [Storage.findById(id)];
        } else if (locationName) {
            storage = [Storage.findOne({
                locationName
            })]
        } else {
            storage = Storage.find({});
        }

        if (!storage) {
            throw new GraphQLError("No Storage found.", { extensions: { code: "NOT_FOUND" } });
        }

        return storage;
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
};

