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
    }

    

    private draw() {

    }


}