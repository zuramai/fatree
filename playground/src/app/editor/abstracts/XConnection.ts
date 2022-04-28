import type { Connection, ConnectionAs } from "@/@types/family";
import { v4 as uuidv4 } from 'uuid';
import type { XLine } from "../components/XLine";
import type { XPerson } from "../components/XPerson";

export class XConnection implements Connection {
    public id: string
    public line: XLine
    public person1: XPerson
    public person2: XPerson
    public as: ConnectionAs 

    constructor(person1: XPerson, person2: XPerson, line: XLine, as: ConnectionAs) {
        this.id = uuidv4()
        this.person1 = person1
        this.person2 = person2
        this.line = line
        this.as = as
    }
}