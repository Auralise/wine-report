import { GraphQLError } from "graphql";
import { Wine } from "../../models/index.js";


export const addWine = async (parent, args, context) => {
    if (context.user) {
        try {
            if (wineValidation(args)) {
                const wine = await Wine.create({
                    name: args.name,
                    vintage: args.vintage || null,
                    variety: args.variety || null,
                    region: args.region,
                    producer: args.producer,
                    locationStorage: {
                        location: args.location,
                        quantity: args.quantity,
                    },
                    category: args.category,
                    comments: []
                });

                return await wine.populate("variety region producer locationStorage.location comments.author");
            }

        } catch (e) {
            throw new GraphQLError(e.message, { extensions: { code: "VALIDATION_ERROR" } })
        }
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}

export const updateWineDetails = async (parent, { wineId, name, vintage, variety, region, category, producer }, context) => {
    if (context.user) {
        throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

}


export const removeWine = async (parent, { wineId }, context) => {
    if (context.user) {
        try {
            const wine = await Wine.findById(wineId);

            if (!wine) throw new Error("No wine with this ID found");

            return await wine.remove();


        } catch (e) {
            throw new GraphQLError(e.message, { extensions: { code: "NO_TARGET" } })
        }

    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

}

export const updateWineStorage = async (parent, {wineId, storageId, quantityChange }, context )=> {
    if (context.user) {
        try {
            //Find the wine
            const wine = await Wine.findById(wineId).populate("variety region producer locationStorage.location comments.author");

            if (!wine) {
                throw new Error("Failed to find wine with that ID");
            }

            //find the location that it is stored
            const locationStorage = wine.locationStorage.filter(location => {
                return location.location.id === storageId;
            })[0];

            if (!locationStorage) {
                throw new Error("Unable to remove wine from a place where there is none");
            }

            if ((locationStorage.quantity + quantityChange) < 0) {
                throw new Error("You can't remove any more");
            }

            locationStorage.quantity += quantityChange;

            wine.save();

            return locationStorage;

        } catch (e) {
            throw new GraphQLError(e.message, { extensions: { code: e.name } });

        }


    }


    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

    
}