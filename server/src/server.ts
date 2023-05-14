import express, { Express, Request, Response } from "express";
import { Announce } from "./model/dto/Announce";
import {AnnounceController} from "./controller/AnnounceController";
import {DatabaseController} from "./controller/DatabaseController";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "http://fedora.local:3000"
}));

// fake DB shim
const database = new DatabaseController();
const announceController = new AnnounceController(database);


app.put("/announce", (req: Request<Announce>, res: Response) => {
    res.status(200);

    console.log(`Received announce for ${req.body.clientId}`);
    const response = announceController.onAnnounce(req.body);
    console.log(JSON.stringify(req.body.clientState));

    res.json(response);
});

app.get("/clients/all", (_, res: Response) => {
    res.status(200);
    res.set("Access-Control-Allow-Origin", "*");
    const response = announceController.onGet();
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
