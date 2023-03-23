import { GraphQLError } from "graphql";
import { Producer } from "../../models/index.js";

export const getProducers = async (parent, {id, name}, context) => {
    if (context.user) {
        let producers = [];
        if (id && name) {
            throw new GraphQLError("Please provide either an ID or a Name when searching producers", { extensions: { code: "BAD_REQUEST" } });
        } else if (id) {
            producers.push(await Producer.findById(id));
        } else if (name) {
            producers.push(await Producer.find({ name }));
        } else {
            producers = Producer.find({});
        }

        return producers;
    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}