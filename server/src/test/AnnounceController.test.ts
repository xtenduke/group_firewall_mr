import {AnnounceController} from "../controller/AnnounceController";
import {DatabaseController} from "../controller/DatabaseController";
import {ClientState} from "../model/dto/ClientState";

const database = new DatabaseController();
const announceController = new AnnounceController(database);

const testClientId = "1234abcd";
const testClientState: ClientState = {
    status: "active",
    default: {
        incoming: "deny",
        outgoing: "allow",
        routed: "deny"
    },
    rules: {
        "1": {
            rule: "samplerule",
            ver: "ipv4"
        }
    }
};

describe("AnnounceController", () => {
    test("mutation server remove rule", () => {
        announceController.onAnnounce({
            clientId: testClientId,
            state: testClientState
        });

        const result = announceController.onAnnounce({
            clientId: testClientId,
            state: {
                ...testClientState,
                rules: {}
            }
        });

        expect(result).toEqual({
            status: "ok",
            mutation: {
                add: [
                    testClientState.rules["1"]
                ]
            }
        });
    });

    test("Get returns all states", () => {
        announceController.onAnnounce({
            clientId: testClientId,
            state: testClientState
        });

        const getAll = announceController.onGet();

        expect(getAll).toEqual([{
            id: testClientId,
            ...testClientState
        }]);
    });
});