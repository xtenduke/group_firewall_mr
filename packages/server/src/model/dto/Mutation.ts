import {Default, RuleInternal} from "./ClientState";

export interface Mutation {
    default?: Default
    add?: RuleInternal[]
    remove?: number[]
}