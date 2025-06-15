import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import router from './routes/app-routes';
import { logger } from './Middlewares/logger.middleware';
import { mongoConnection } from "./config/db.connection";

const app = express();

const port = 2000;

app.use(express.json());

app.use(logger)
app.use(router)

mongoConnection()
app.listen(port, () => {
    console.log(`The server is connected and running on port ${port}`)
})