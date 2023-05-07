import { StringAllowDeny } from "./StringAllowDeny"

export interface Default {
    incoming: StringAllowDeny
    outgoing: StringAllowDeny
    routed: StringAllowDeny
}

export interface ClientState {
    status: "active" | "inactive"
    default: Default
    rules: any // looks like '1': 'allow SSH'
}
