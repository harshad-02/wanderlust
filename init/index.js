import mongoose from "mongoose";
import data from "./data.js";
import Listing from "../models/listing.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await initDB();

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error(err);
  }
}

const OWNER_ID = "696a257faffdc3b3e80e7fbe";

const initDB = async () => {
  await Listing.deleteMany({});

  // 🔴 ADD owner using map
  const listingsWithOwner = data.map(listing => ({
    ...listing,
    owner: OWNER_ID
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("Data was initialized with owner");
};
main();