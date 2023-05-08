import { StringAllowDeny } from "./StringAllowDeny"

export interface Default {
    incoming: StringAllowDeny
    outgoing: StringAllowDeny
    routed: StringAllowDeny
}

interface RuleInternal {
    rule: string
    ver: string
}

export interface Rule extends RuleInternal {
    index: number
}

export interface ClientState {
    status: "active" | "inactive"
    default: Default
    rules: { [id: string]: RuleInternal }
}
