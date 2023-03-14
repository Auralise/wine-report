import { GraphQLError } from "graphql";
import { Wine } from "../../models/index.js";


export const addComment = async (parent, {wineId, contents}, context) => {
    if (context.user) {
        const wine = Wine.findById(wineId);
        if (wine) {
            if (contents.length < 1 || contents.length > 500) {
                throw new GraphQLError("Please provide a comment between 1 and 500 characters in length");
            }
            const comment = {
                content: contents,
                author: context.user._id
            }
            const newWine = await Wine.findByIdAndUpdate(wineId, { $push: { comments: comment } }, { new: true }).populate("variety region producer locationStorage.location comments.author");

            return newWine;

        } else {
            throw new GraphQLError("No Wine by this ID found", { extensions: { code: "" } })
        }
    }

    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });
}

export const removeComment = async (parent, {wineId, commentId}, context) => {
    if (context.user) {
        const wine = Wine.findById(wineId);
        if (!wine) {
            throw new GraphQLError("No wine by this ID");
        }

        wine.comment.pull(commentId);
        wine.save();

        return wine;

    }
    throw new GraphQLError("Please login", { extensions: { code: "UNAUTHORISED" } });

}