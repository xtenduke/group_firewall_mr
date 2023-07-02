import {Rule, ClientState} from "../../../server/src/model/dto/ClientState"

export const parseRules = (entries: ClientState): Rule[] => {
    return Object.entries(entries.rules).map((val) => {
        return {
            index: Number(val[0]),
            rule: val[1].rule,
            ver: val[1].ver
        };
    });
}