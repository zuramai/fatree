import { ComponentType } from "@/@types/component";
import type { Coordinate } from "@/@types/editor";
import { LineType, type LineOptions, type LinePosition, type LineTypePath, type XLineConstructor } from "@/@types/lines";
import { computed, onMounted, watch, type ComputedRef, type Ref } from "vue";
import { XComponent } from "./XComponent";
import LineTypes from "./line/types"

export class XLine extends XComponent {
    from: XComponent
    to: XComponent
    options: LineOptions
    position: LinePosition = "middle"
    fromCoordinate?: ComputedRef<Coordinate>
    toCoordinate?: ComputedRef<Coordinate>
    types: Record<LineType, LineTypePath> = {
        CURVED: new LineTypes.CurveLine,
        ORTHOGONAL: new LineTypes.OrthogonalLine,
        STRAIGHT: new LineTypes.StraightLine,
    }

    constructor(data: XLineConstructor) {
        super(ComponentType.LINE)
        this.id = data.id
        this.from = data.from
        this.to = data.to
        this.options = data.options!

        this.draw()
    }

    onMounted(el: Ref<SVGGraphicsElement>) {
        let bbox = computed(() => el.value.getBBox())
        
        this.setElement(el, bbox)
        this.initPosition()
    }

    initPosition() {
        this.fromCoordinate = computed<Coordinate>((): Coordinate => {
            let bbox = this.getBBox() as any
            
            let bboxW = (bbox.width ?? 0)
            let bboxH = (bbox.height ?? 0)
    
            let deltaW = this.to.centerPosition.x > this.from.centerPosition.x ? bboxW : -bboxW
            // let deltaH = this.to.centerPosition.y > this.from.centerPosition.y ? bboxH : -bboxH
            let deltaH = 0

            if(this.options.type == LineType.ORTHOGONAL) deltaW = 0
            
            let pos = {
                x: this.from.centerPosition.x + deltaW / 2,
                y: this.from.centerPosition.y + deltaH,
            }
            return pos
        })

        this.toCoordinate = computed<Coordinate>((): Coordinate => {
            let pos: Coordinate;
            let bboxFrom = this.from.getBBox()  
            let bboxTo = this.to.getBBox()
            

            let deltaW = this.to.centerPosition.x > this.from.centerPosition.x ? -(bboxFrom.width ?? 0) : (bboxFrom.height ?? 0)
            let deltaH = 0
            if(this.options.type == LineType.ORTHOGONAL) deltaW = 0
            

            if(this.to.type == "line") {
                // To the bottom of the target line
                pos = {
                    x: bboxTo.x + bboxTo.width/2,
                    y: bboxTo.y + bboxTo.height
                }
                
            } else {
                pos = {
                    x: this.to.centerPosition.x + deltaW / 2,
                    y: this.to.centerPosition.y + deltaH,
                }
            }
            return pos
        })
    }

    private draw() {

    }


}