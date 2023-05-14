import express, { Express, Request, Response } from "express";
import { Announce } from "./model/dto/Announce";
import {AnnounceController} from "./controller/AnnounceController";
import {DatabaseController} from "./controller/DatabaseController";

const app: Express = express();
const port = process.env.PORT || 32769;

app.use(express.json());

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
    const response = announceController.onGet();
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
