import type { ComponentInterface, ComponentState, ComponentType } from "@/@types/component"
import type { Coordinate } from "@/@types/editor"
import { computed, reactive, ref, type ComputedRef, type Ref } from "vue"

export class XComponent implements ComponentInterface {
    public type: ComponentType
    public state: ComponentState = reactive({
        isActive:false,
        isHovered:false,
        isDragging:false,
    })
    public el: Ref<SVGGraphicsElement|null|undefined> = ref()
    public bbox: Ref<DOMRect|undefined> = ref()!
    
    constructor(type: ComponentType) {
        this.type = type
    }

    public holdingFrom = {
        mouse: {x: 0, y: 0},
        component: {x: 0, y: 0}
    }

    public setBBox() {
        this.bbox.value = this.el.value!.getBBox()
    }
}