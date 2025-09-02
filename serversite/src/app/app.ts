
import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrohandler";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";

import "./config/passport"
import { envVars } from "./config/env";


const app: Application = express();


app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json());
app.set("trust proxy",1)
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: envVars.FONTEND_URL,
  credentials: true
}))


app.use("/api/v1", router)










app.get('/', (req: Request, res: Response) => {
   res.send("Welcome to Note App");
});




app.use(globalErrorHandler)

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


export default app