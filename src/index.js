import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config();
const port = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR: on server starting", error);
      throw error;
    })

    app.listen(port, () => {
      console.log(`server running on port: ${port}`)
    })
  }
  )
  .catch((error) => {
    console.error("mongodb connection failed !", error)
  })



/*

// one of the approach

import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

(async () => {
  try {

    // connect to database
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    })

    app.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })

  } catch (error) {
    console.error("ERROR: ", error)
    throw error
  }
})();

*/