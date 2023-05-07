import {Default} from "./ClientState"

export interface Mutation {
    default?: Default
    add?: any[]
    remove?: any[]
}

export interface Removal {
    index: number
}
