import { GraphQLError } from "graphql";
import { Region } from "../../models/index.js";

export const getRegions = async (parent, {id, name}, context) => {
    if (context.user) {
        let regions = [];
        if (id && name) {
            throw new GraphQLError("Please provide either an ID or a Name when searching regions", { extensions: { code: "BAD_REQUEST" } });
        } else if (id) {
            regions.push(await Region.findById(id));
        } else if (name) {
            regions.push(await Region.find({ name }));
        } else {
            regions = Region.find({});
        }

        return regions;
    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}