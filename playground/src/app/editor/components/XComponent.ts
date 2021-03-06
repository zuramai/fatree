import type { ComponentInterface, ComponentState, ComponentType } from "@/@types/component"
import type { Coordinate } from "@/@types/editor"
import type { Connection } from "@/@types/family"
import { computed, reactive, ref, type ComputedRef, type Ref } from "vue"

export class XComponent implements ComponentInterface {
    public id: string = ""
    public type: ComponentType
    public state: ComponentState = reactive({
        isActive:false,
        isHovered:false,
        isDragging:false,
    })
    public el: any 
    public connections: Connection[] = []
    public bbox!: ComputedRef<DOMRect> 
    public centerPosition: Coordinate = { x: 0, y: 0 }
    public isMounted: Ref<boolean> = ref<boolean>(false)
    
    constructor(type: ComponentType) {
        this.type = type
    }

    public holdingFrom = {
        mouse: {x: 0, y: 0},
        component: {x: 0, y: 0}
    }

    public setElement(el: Ref<SVGGraphicsElement>, bbox: ComputedRef<DOMRect>) {
        this.el = el
        
        this.bbox = bbox
        return this.getBBox()
    }

    public getBBox() {
        // console.log(this.bbox);
        return this.bbox
    }
}