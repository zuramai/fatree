import type { Coordinate } from "@/@types/editor"
import { reactive, ref, type Ref } from "vue"

export class XComponent {
    public isFocus: Ref<boolean> = ref(false)
    public isHovered: Ref<boolean> = ref(false)
    public isHolding: Ref<boolean> = ref(false)

    public holdingFrom: Ref<Coordinate> = ref({x: 0, y: 0})

    
}