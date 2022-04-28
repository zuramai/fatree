import type { Coordinate } from "@/@types/editor";
import type { LineOptions, LineType, XLineConstructor } from "@/@types/lines";
import { computed, type ComputedRef } from "vue";
import type { XComponent } from "./XComponent";

export class XLine {
    id: string
    from: XComponent
    to: XComponent
    options: LineOptions
    fromCoordinate: ComputedRef<Coordinate>
    toCoordinate: ComputedRef<Coordinate>

    constructor(data: XLineConstructor) {
        this.id = data.id
        this.from = data.from
        this.to = data.to
        this.options = data.options!

        this.fromCoordinate = computed<Coordinate>((): Coordinate => {
            let bboxW = (this.from.bbox.value.width ?? 0)
            let bboxH = (this.from.bbox.value.height ?? 0)
    
            let deltaW = this.to.centerPosition.x > this.from.centerPosition.x ? bboxW : -bboxW
            let deltaH = this.to.centerPosition.y > this.from.centerPosition.y ? bboxH : -bboxH
            
            let pos = {
                x: this.from.centerPosition.x + deltaW,
                y: this.from.centerPosition.y + deltaH,
            }
            console.log(pos)
            return pos
        })
        this.toCoordinate = computed<Coordinate>((): Coordinate => {
            let bboxW = (this.from.bbox.value.width ?? 0)
            let bboxH = (this.from.bbox.value.height ?? 0)

            let deltaW = this.to.centerPosition.x > this.from.centerPosition.x ? bboxW : -bboxW
            let deltaH = this.to.centerPosition.y > this.from.centerPosition.y ? bboxH : -bboxH
            let pos = {
                x: this.to.centerPosition.x + deltaW,
                y: this.to.centerPosition.y + deltaH,
            }
            console.log(pos)
            return pos
        })

        this.draw()
    }

    private draw() {

    }


}