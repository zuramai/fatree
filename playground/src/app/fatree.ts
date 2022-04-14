import type { Coordinate, MouseEventType } from "@/@types/editor"
import { useEditorStore } from "@/stores/editor"
import { useFamilyStore } from "@/stores/family"
import { computed, onMounted, ref } from "vue"
import type { XLine } from "./editor/components/XLine"
import type { XPerson } from "./editor/components/XPerson"
import { FatreeLines } from "./modules/fatreeLines"
import { FatreePeople } from "./modules/fatreePeople"
import { MouseUtils } from "./utils"

export class Fatree {
    public people: FatreePeople = new FatreePeople
    public lines: FatreeLines = new FatreeLines
    public family = useFamilyStore()
    public editor = useEditorStore()

    constructor() {
        onMounted(() => this.onMounted())
    }

    setSVG(svg: SVGGraphicsElement|null) {
        if(!svg) 
            throw new Error('SVG element not found')

        this.editor.svg = svg
    }

    onMounted() {
        this.family = useFamilyStore()
    }

    onMouseEvent(e: MouseEvent, name: MouseEventType) {
        const mouseEventMap: {[key in MouseEventType]: (e: MouseEvent) => void} = {
            "click": this.onMouseClick,
            "mouseover": this.onMouseOver,
            "mouseup": this.onMouseUp,
            "mousemove": this.onMouseMove,
            "mouseleave": this.onMouseLeave,
            "mouseenter": this.onMouseEnter,
            "mousedown": this.onMouseDown,
        }

        mouseEventMap[name].call(this,e)
    }

    
    private onMouseClick(e: MouseEvent) {
        let clickTarget = MouseUtils.getMouseTarget(e)

        if(clickTarget == 'bg-grid') {
            // Clear all selected elements
            this.family.clearAllActiveState()
        }else if(clickTarget == 'person') {

        }
    }

    private onMouseMove(e: MouseEvent) {
        this.editor.setMousePosition(e.clientX, e.clientY)

        let personInHold = this.family.filterPeopleByState("isActive")

        if(this.editor.isMouseDown) {
            // Move all `isDragging` people
            for(let i = 0; i < personInHold.length; i++) {
                let person = this.people.getPerson(personInHold[i].id)
        
                let newLocation = {
                    x: person!.state.startDraggingAt!.x + (this.editor.mousePosition.x - this.editor.mouseHoldingFrom!.x),
                    y: person!.state.startDraggingAt!.y + (this.editor.mousePosition.y - this.editor.mouseHoldingFrom!.y),
                }
                person.setLocation(newLocation)
            }
        }
    }
    private onMouseOver(e: MouseEvent) {}
    private onMouseUp(e: MouseEvent) {
        this.editor.isMouseDown = false
    }
    private onMouseLeave(e: MouseEvent) {}
    private onMouseEnter(e: MouseEvent) {}
    private onMouseDown(e: MouseEvent) {
        console.log("EVENT FROM EDITOR")
        this.editor.isMouseDown = true
        Object.keys(this.family.people).forEach(id => this.family.people[id].state.startDraggingAt = this.family.people[id].position)
        this.editor.mouseHoldingFrom = this.editor.mousePosition
    }

}

export function createFatree() {
    return new Fatree()
}