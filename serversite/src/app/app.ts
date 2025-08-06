import express, { Application, Request, Response } from "express";
import cors from 'cors'





const app: Application = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173"  
}))





app.get('/', (req: Request, res: Response) => {
   res.send("Welcome to Note App");
});


export default app