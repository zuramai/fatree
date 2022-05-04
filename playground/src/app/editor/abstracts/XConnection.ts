import type { Connection, ConnectionAs } from "@/@types/family";
import { v4 as uuidv4 } from 'uuid';
import type { XLine } from "../components/XLine";
import { XPerson } from "../components/XPerson";

export class XConnection implements Connection {
    public id: string
    public line: XLine
    public person1: XPerson
    public person2?: XPerson
    public parent?: XConnection
    public as: ConnectionAs 

    constructor(as: ConnectionAs, person1: XPerson, person2: XPerson|XConnection, line: XLine) {
        this.id = uuidv4()
        this.person1 = person1
        this.line = line
        this.as = as
        if(person2 instanceof XPerson) this.person2 = person2
        else this.parent = person2
    }
}