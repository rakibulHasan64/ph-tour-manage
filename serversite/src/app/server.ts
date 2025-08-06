/* eslint-disable no-console */


import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./config/env";

let server: Server;


const startServer = async () => {
   try {


      
      await mongoose.connect(envVars.DB_URL);
      console.log("Connected to MongoDB");

      server = app.listen(envVars.PORT, () => {
         console.log(`Server is listening on port ${envVars.PORT}`);
      });

   } catch (error) {
      console.log("Failed to connect to MongoDB", error);
   }
};

startServer();

process.on("SIGTERM", () => {
   console.log("SIGTERM received. Shutting down gracefully...");
   if (server) {
      server.close(() => {
         console.log("Server closed due to SIGTERM");
         process.exit(1);
      });
   } else {
      process.exit(1);
   }
});

process.on("unhandledRejection", (err) => {
   console.error("Unhandled Rejection:", err);
   if (server) {
      server.close(() => {
         console.log("Server closed due to unhandled rejection");
         process.exit(1);
      });
   } else {
      process.exit(1);
   }
});

process.on("uncaughtException", (err) => {
   console.error("Uncaught Exception:", err);
   if (server) {
      server.close(() => {
         console.log("Server closed due to uncaught exception");
         process.exit(1);
      });
   } else {
      process.exit(1);
   }
});

// For testing purposes only (comment this out in production)
// throw new Error("I forgot to handle this local error");

