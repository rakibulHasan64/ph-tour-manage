
import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrohandler";



const app: Application = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173"  
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