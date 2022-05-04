import type {  MouseEventType } from "@/@types/editor"
import { onMounted, reactive } from "vue"
import type { XPerson } from "./editor/components/XPerson"
import { Editor } from "./editor/editor"
import { FConnections } from "./modules/FConnections"
import { FLines } from "./modules/FLines"
import { FPeople } from "./modules/FPeople"
import { MouseUtils } from "./utils"
import { ConnectionAs, type Connection } from "@/@types/family";
import { XConnection } from "./editor/abstracts/XConnection"
import { LineType } from "@/@types/lines"

export class Fatree {
    public people: FPeople = new FPeople
    public lines: FLines = new FLines
    public connections: Record<string, XConnection> = reactive({})
    public editor: Editor

    constructor() {
        this.editor = reactive(new Editor)
    }

    setSVG(svg: SVGGraphicsElement|null) {
        if(!svg) 
            throw new Error('SVG element not found')

        this.editor.svg = svg
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

    setMode(mode: string) {
        
    }

    public connectPeople(as: ConnectionAs = ConnectionAs.SPOUSE, person1: XPerson, person2: XPerson, person3?: XPerson) {
        let connection

        if(as == ConnectionAs.PARENT) {
            // Person1 is the parent of Person2
            person1.addChild(person2)
            person2.addParent(person1)
        } else if (as == ConnectionAs.CHILD) {
            // Person3 is a child of Person1 and Person2
            person1.addParent(person2)
            person2.addChild(person1)
            person3!.addChild(person1)
        } else {
            // Person1 is a spouse of Person2
            person1.addSpouse(person2)
            person2.addSpouse(person1)
        }
        
        return connection
    }

    public addSpouse(person1: XPerson, person2: XPerson) {
        person1.addSpouse(person2)
        person2.addSpouse(person1)

        let line = this.lines.addLine({
            from: person1,
            to: person2,
        })

        let connection  = new XConnection(ConnectionAs.SPOUSE, person1, person2, line)
        this.connections[connection.id] = connection

        return connection
    }

    public addChild(relationship: XConnection, child: XPerson) {
        relationship.line.position = "bottom"
        let line = this.lines.addLine({
            from: child,
            to: relationship.line,
        })
        let connection  = new XConnection(ConnectionAs.SPOUSE, child, relationship, line)
        this.connections[connection.id] = connection
    }
    
    private onMouseClick(e: MouseEvent) {
        let clickTarget = MouseUtils.getMouseTarget(e)

        if(clickTarget == 'bg-grid') {
            // Clear all selected elements
            this.people.clearAllActiveState()
        }else if(clickTarget == 'person') {

        }
    }

    private onMouseMove(e: MouseEvent) {
        this.editor.setMousePosition(e.clientX, e.clientY)

        let personInHold = this.people.filterPeopleByState("isActive", true)

        if(this.editor.isMouseDown) {
            // console.log("editor on mouse down")
            // Move all `isDragging` people
            for(let i = 0; i < personInHold.length; i++) {
                let person = this.people.getPerson(personInHold[i].id)
        
                let newLocation = {
                    x: person!.state.startDraggingAt!.x + (this.editor.mousePosition.x - this.editor.mouseHoldingFrom.x),
                    y: person!.state.startDraggingAt!.y + (this.editor.mousePosition.y - this.editor.mouseHoldingFrom.y),
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
        Object.keys(this.people.people).forEach(id => {
            let person = this.people.getPerson(id)
            person.state.startDraggingAt = person.centerPosition
        })
        this.editor.mouseHoldingFrom = this.editor.mousePosition
    }

}

export function createFatree() {
    return new Fatree()
}