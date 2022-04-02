import type { Coordinate } from "@/@types/editor"
import { reactive, ref, type Ref } from "vue"

export class XComponent {
    public isFocus: Ref<boolean> = ref(false)
    public isHovered: Ref<boolean> = ref(false)
    public isHolding: Ref<boolean> = ref(false)
    public bbox: Ref<Partial<DOMRect>> = ref<Partial<DOMRect>>({x: 0, y:0, width: 0, height: 0});
    public el: Ref<SVGGraphicsElement|undefined> = ref()

    public holdingFrom = {
        mouse: {x: 0, y: 0},
        component: {x: 0, y: 0}
    }

    public calculateBBox() {
        this.bbox.value = this.el.value!.getBBox()   
    }
}