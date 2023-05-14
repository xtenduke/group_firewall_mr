import {DatabaseController} from "./DatabaseController";
import {Mutation} from "../model/dto/Mutation";
import {ClientState, ClientStateResponse, Rule} from "../model/dto/ClientState";
import {Announce} from "../model/dto/Announce";

export interface AnnounceResponse {
    status: string
    mutation?: Mutation
}

export class AnnounceController {
    public constructor(
        private readonly database: DatabaseController
    ) {}
    
    public onGet(): ClientStateResponse[] {
        return this.database.clientStateGetAll();
    }
    
    public onAnnounce(announce: Announce): AnnounceResponse {
        const storedState = this.database.clientStateGet(announce.clientId);

        let response: { status: string, mutation?: Mutation } = {
            status: "ok"
        };

        if (!storedState) {
            this.database.clientStateSet(announce.clientId, announce.clientState);
            console.log("Set new state");
        } else {
            const currentState = announce.clientState;
            const mutation = this.calculateMutation(storedState, currentState);
            if (mutation) {
                response = {
                    ...response,
                    mutation,
                };
            }
        }
        
        return response;
    }

    private parseRules(entries: ClientState): Rule[] {
        return Object.entries(entries.rules).map((val) => {
            return {
                index: Number(val[0]),
                rule: val[1].rule,
                ver: val[1].ver
            };
        });
    }

    private calculateMutation(desiredState: ClientState, clientState: ClientState): Mutation | undefined {
        let mutation: Mutation | undefined;

        if (
            desiredState.default?.incoming !== clientState.default?.incoming
            || desiredState.default?.outgoing !== clientState.default?.outgoing
            || desiredState.default?.routed !== clientState.default?.routed
        ) {
            mutation = {
                default: desiredState.default
            };
        }

        const desired = this.parseRules(desiredState);
        const current = this.parseRules(clientState);

        const toAdd = desired.filter((desiredItem) => {
            return !current.find((currentItem) => desiredItem.rule === currentItem.rule && desiredItem.ver === currentItem.ver);
        }).map((item) => {
            return {
                rule: item.rule,
                ver: item.ver
            };
        });

        if (toAdd.length > 0) {
            mutation = {
                ...mutation,
                add: toAdd
            };
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
            };
        }

        console.log("mutation");
        console.log(mutation);
        return mutation;
    }
}