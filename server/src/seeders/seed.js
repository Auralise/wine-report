import { default as db } from "./config/connection.js";
import { Wine, Producer, Region, Storage, User, Variety } from "../models/index.js";
import producerSeeds from "./producerSeeds.js";
import regionSeeds from "./regionSeeds.js";
import storageSeeds from "./storageSeeds.js";
import varietySeeds from "./varietySeeds.js";
import wineSeeds from "./wineSeeds.js";

db.once("open", async () => {

    await Wine.deleteMany({});
    await User.deleteMany({});
    await Producer.deleteMany({});
    await Region.deleteMany({});
    await StorageLocation.deleteMany({});
    await Variety.deleteMany({});

    const producers = [];
    const regions = []; 
    const storage = [];
    const variety = [];
    const wine = [];

    for(let i = 0; i < producerSeeds.length; i++){
        producers.push(Producer.create(producerSeeds[i]));
    }


});