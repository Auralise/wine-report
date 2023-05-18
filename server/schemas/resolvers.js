import { GraphQLError } from "graphql";

import { Wine, Producer, Region, Storage, User, Variety } from "../models/index.js";

import { userValidation, wineValidation, isValidEmail } from "../utils/validation.js";

//imports of query methods
import {
    getAllUsers,
    getSpecificUser,
    getMe,
    getVarieties,
    getRegions,
    getProducers,
    searchWine,
    getSpecificWine,
    getStorage,
} from "./queries/index.js";

import {
    addUser,
    login,
    addWine,
    updateWineDetails,
    removeWine,
    updateWineStorage,
    addProducer, 
    updateProducer,
    addRegion, 
    updateRegion,
    addVariety, 
    updateVariety,
    addComment, 
    removeComment,
    addStorage,

} from "./mutations/index.js";

const resolvers = {
    Query: {
        users: getAllUsers,
        user: getSpecificUser,
        me: getMe,

        varieties: getVarieties,
        regions: getRegions,
        producers: getProducers,

        wine: searchWine,
        specificWine: getSpecificWine,

        storage: getStorage,

        //TODO: Implement logic to find all wines in a storage location and the quantity
        allWinesInLocation: async (parent, { locationId }, context) => {
            if (context.user) {
                throw new GraphQLError("Not yet implemented", { extensions: { code: "NOT_IMPLEMENTED" } });
            }

            throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
        }


    },

    Mutation: {
        //Non authenticated endpoints
        // Further development decision on allowing administrators to add users 
        addUser: addUser,
        login: login,

        // Authenticated mutations
        //Wine 
        addWine: addWine,
        updateWineDetails: updateWineDetails,
        removeWine: removeWine,
        updateWineStorage: updateWineStorage,

        // Producer
        addProducer: addProducer,
        updateProducer: updateProducer,

        //Region
        addRegion: addRegion,
        updateRegion: updateRegion,

        //Variety
        addVariety: addVariety,
        updateVariety: updateVariety,

        //Comments
        addComment: addComment,
        removeComment: removeComment,

        //Storage
        addStorage: addStorage,
    }
}


export default resolvers;