import { LineType, type LineOptions, type XLineConstructor } from "@/@types/lines";
import { reactive } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { XLine } from "../editor/components/XLine";

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
}