import type { Coordinate } from "@/@types/editor"
import { computed, reactive, ref, type ComputedRef, type Ref } from "vue"

export class XComponent {
    public isFocus: Ref<boolean> = ref(false)
    public isHovered: Ref<boolean> = ref(false)
    public isDragging: Ref<boolean> = ref(false)
    public el: Ref<SVGGraphicsElement|undefined> = ref()
    public bbox!: DOMRect

    public holdingFrom = {
        mouse: {x: 0, y: 0},
        component: {x: 0, y: 0}
    }


    public setBBox() {
        this.bbox = this.el.value!.getBBox()
    }
}