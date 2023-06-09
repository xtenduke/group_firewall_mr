import {ClientState, ClientStateResponse} from "../model/dto/ClientState";

export class DatabaseController {
    private clientState = new Map<string, ClientStateResponse>();
    
    public clientStateSet(id: string, data: ClientState) {
        this.clientState.set(id, { id, ...data });
    }
    
    public clientStateGet(id: string): ClientStateResponse | undefined {
        return this.clientState.get(id);
    }
    
    public clientStateGetAll(): ClientStateResponse[] {
        return Array.from(this.clientState.values());
    }
}