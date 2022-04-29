import { ComponentType } from "@/@types/component";
import type { Coordinate } from "@/@types/editor";
import type { LineOptions, LineType, XLineConstructor } from "@/@types/lines";
import { computed, onMounted, watch, type ComputedRef, type Ref } from "vue";
import { XComponent } from "./XComponent";

export class XLine extends XComponent {
    from: XComponent
    to: XComponent
    options: LineOptions
    fromCoordinate?: ComputedRef<Coordinate>
    toCoordinate?: ComputedRef<Coordinate>

    constructor(data: XLineConstructor) {
        super(ComponentType.LINE)
        this.id = data.id
        this.from = data.from
        this.to = data.to
        this.options = data.options!

        this.draw()
    }

    onMounted(el: Ref<SVGGraphicsElement|null>) {
        this.el = el
        console.log("Line mounted");
        
        this.initPosition()
    }

    initPosition() {
        this.fromCoordinate = computed<Coordinate>((): Coordinate => {
            
            let bboxW = (this.from.bbox.value.width ?? 0)
            let bboxH = (this.from.bbox.value.height ?? 0)
    
            let deltaW = this.to.centerPosition.x > this.from.centerPosition.x ? bboxW : -bboxW
            // let deltaH = this.to.centerPosition.y > this.from.centerPosition.y ? bboxH : -bboxH
            let deltaH = 0
            
            let pos = {
                x: this.from.centerPosition.x + deltaW / 2,
                y: this.from.centerPosition.y + deltaH,
            }
            console.log(pos)
            return pos
        })

        this.toCoordinate = computed<Coordinate>((): Coordinate => {
            let bbox = this.from.bbox.value
            let bboxW = (bbox.width ?? 0)
            let bboxH = (bbox.height ?? 0)

            let deltaW = this.to.centerPosition.x > this.from.centerPosition.x ? -bboxW : bboxW
            let deltaH = 0

            let pos = {
                x: this.to.centerPosition.x + deltaW / 2,
                y: this.to.centerPosition.y + deltaH,
            }
            console.log(pos)
            return pos
        })
    }


    private draw() {

    }


}