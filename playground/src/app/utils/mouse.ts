import type { Coordinate } from "@/@types/editor"
import { useFamilyStore } from "@/stores/family"


let svg: SVGGraphicsElement|null = null
export class MouseUtils {
    

    public static getMouseTarget(e: MouseEvent) {
        let el = e.target as HTMLElement

        // ORDER MATTERS!
        let targets = ['person', 'line', 'bg-grid']

        for(let i = 0; i < targets.length; i++) {
            if(el.closest(`[data-component=${targets[i]}`) !== null) return targets[i]
        }

        return null
    }
}