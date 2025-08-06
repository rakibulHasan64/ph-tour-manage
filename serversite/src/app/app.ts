import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import { router } from "./routes";



const app: Application = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173"  
}))


app.use("/api/v1", router)





// app.use((err: any, req:Request, res:Response, next: NextFunction) => {
  
// })




app.get('/', (req: Request, res: Response) => {
   res.send("Welcome to Note App");
});


export default app