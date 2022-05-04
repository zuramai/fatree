import type { XConnection } from "@/app/editor/abstracts/XConnection"
import type { XLine } from "@/app/editor/components/XLine"
import type { XPerson } from "@/app/editor/components/XPerson"

export enum ConnectionAs {
    PARENT = "parent",
    CHILD = "child",
    SPOUSE = "spouse",
}
export interface Connection {
    id?: string
    person1: XPerson 
    person2?: XPerson 
    line?: XLine 
    as: ConnectionAs // Person1 has connection as `ConnectionAs` to Person2
}
