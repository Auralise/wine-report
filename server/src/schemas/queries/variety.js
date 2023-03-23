import { GraphQLError } from "graphql";
import { Variety } from "../../models/index.js";

export const getVarieties = async ( parent, {id, name}, context) => {
    if (context.user) {
        // if passed an ID, attempt to find by id
        let varieties = [];
        if (id && name) {
            throw new GraphQLError("Please provide either an ID or a Name when searching varieties", { extensions: { code: "BAD_REQUEST" } });
        } else if (id) {
            varieties.push(await Variety.findById(id));
        } else if (name) {
            varieties.push(await Variety.find({ name }));
        } else {
            varieties = await Variety.find({});
        }

        return varieties;
    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}
