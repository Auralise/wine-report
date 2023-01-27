import { gql, useQuery } from "@apollo/client";

// TODO: Define proper structure for this once database complexity has been worked out.
// This has been defined as a placeholder for the moment
export const GET_SINGLE_WINE = gql`
    query getSingleWine($id: ID, $name: String, $vintage: Int, $winery: String){
        wine {
            _id
            name
            vintage
            winery
            location {
                Shelf
            }
        }
    }


`;