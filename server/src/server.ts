import express, { Express, Request, Response } from 'express';
import { Announce } from './model/dto/Announce';
import {ClientState, Rule} from './model/dto/ClientState';
import {Mutation} from './model/dto/Mutation';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const clientState = new Map<string, ClientState>()

const compare = (desiredState: ClientState, clientState: ClientState): Mutation | undefined => {
    let mutation: Mutation | undefined;

    if (
        desiredState.default.incoming !== clientState.default.incoming
        || desiredState.default.outgoing !== clientState.default.outgoing
        || desiredState.default.routed !== clientState.default.routed
    ) {
        mutation = {
            default: desiredState.default
        }
    }


    // loop over all rules
    // find rules that exist in desired state, dont exist in current state - add them to the 'add' list
    // find rules that exist in the currentState, dont exist in desired state - add them to the 'remove' list

    const desired: Rule[] = Object.entries(desiredState.rules).map((val) => {
        return {
            index: Number(val[0]),
            rule: val[1].rule,
            ver: val[1].ver
        }
    });

    const current: Rule[] = Object.entries(clientState.rules).map((val) => {
        return {
            index: Number(val[0]),
            rule: val[1].rule,
            ver: val[1].ver
        }
    });

    const toAdd = desired.filter((desiredItem) => {
        return !current.find((currentItem) => desiredItem.rule === currentItem.rule && desiredItem.ver === currentItem.ver);
    }).map((item) => {
        return {
            rule: item.rule,
            ver: item.ver
        }
    });

    if (toAdd.length > 0) {
        mutation = {
            ...mutation,
            add: toAdd
        }
    }

    // remove
    const toRemove = current.filter((unDesiredItem) => {
        return !desired.find((currentItem) => unDesiredItem.rule === currentItem.rule && unDesiredItem.ver === currentItem.ver);
    }).map((item) => {
        return item.index;
    });

    if (toRemove.length > 0) {
        mutation = {
            ...mutation,
            remove: toRemove
        }
    }

    console.log("mutation");
    console.log(mutation);

    return mutation;
}

app.put('/announce', (req: Request<Announce>, res: Response) => {
    res.status(200);

    console.log(`Received announce for ${req.body.clientId}`);

    const storedState = clientState.get(req.body.clientId)

    let response: any = {
        status: "ok"
    }

    if (!storedState) {
        clientState.set(req.body.clientId, req.body.clientState);
        console.log("Set new state");
    } else {
        const currentState = req.body.clientState;
        const mutation = compare(storedState, currentState);
        if (mutation) {
            response = {
                ...response,
                mutation,
            };
        }
    }

    res.json(response);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
