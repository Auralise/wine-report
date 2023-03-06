import { GraphQLError } from "graphql";
import { Producer } from "../../models/index.js";

export const addProducer = async (parent, {name, email, phone}, context) => {
    if (context.user) {
        try {
            if (name.length < 3 || name.length > 50) {
                throw new Error("Please provide a name for the producer between 3 and 50 characters in length");
            }

            if (email && !isValidEmail(email)) {
                throw new Error("Please provide a valid email");
            }

            if (phone && !phone.match(/^\+?[0-9]{6,12}/)) {
                throw new Error("Please provide a valid phone number");
            }

            const producer = await Producer.create({
                name,
                email: email || null,
                phone: phone || null
            });

            return producer;

        } catch (e) {
            throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } });
        }
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}

export const updateProducer = async (parent, { producerId, name, email, phone }, context) => {
    throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
}

