import { LineType, type LineOptions, type XLineConstructor } from "@/@types/lines";
import { reactive } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { XLine } from "../editor/components/XLine";
import type { XPerson } from "../editor/components/XPerson";

export class FLines {
    public lines: {[id: string]: XLine} = reactive({})
    public lineDefaultOptions: LineOptions = {
        type: LineType.ORTHOGONAL,
        color: "#333",
        width: 5
    }
    
    addLine(data: Omit<XLineConstructor, "id">) {
        let line = new XLine({
            id: uuidv4(),
            from: data.from,
            to: data.to,
            options: { ...this.lineDefaultOptions, ...data.options }
        })

        this.lines[line.id] = line

        return line
    }

    getLine(id: string) {
        return this.lines[id]
    }

    getPersonLine(from: XPerson, to: XPerson) {
        console.log(this.lines)
        return Object.values(this.lines).find(line => {
            return (line.from == from && line.to == to) || (line.to == from && line.from == to)
        })
    }
}