import type { Coordinate, MouseEventArgs, MouseEventType } from "@/@types/editor";
import type { Person, PersonStyles } from "@/@types/person"
import { useEditorStore } from "@/stores/editor";
import { useFamilyStore } from "@/stores/family"
import { computed, reactive, ref, watch, type ComputedRef, type Ref } from "vue";
import { XComponent } from "./XComponent";

export interface Props {
    id: string
    index: number
    hoverColor?: string
}

export interface ElementPositions {
    image: Coordinate
    name: Coordinate
}

export class XPerson extends XComponent {
    public family
    public editor
    public person: Person
    public props: Props
    public styles: ComputedRef<PersonStyles>
    public positions: ComputedRef<ElementPositions>
    public svgStyles = computed(() => ({
        stroke: "#000",
        fill: this.isHovered.value ? "#eee" : "transparent"
    }))
    public $emit: any
    

    private mouseEventMap: {[key in MouseEventType]: (e: MouseEvent, args: MouseEventArgs) => void} = {
        "click": this.onMouseClick,
        "mouseover": this.onMouseOver,
        "mouseup": this.onMouseUp,
        "mousemove": this.onMouseMove,
        "mouseleave": this.onMouseLeave,
        "mouseenter": this.onMouseEnter,
        "mousedown": this.onMouseDown,
    }

    constructor(props: Props) {
        super()
        
        this.editor = useEditorStore()
        this.family = useFamilyStore()
        this.person = this.family.getPerson(props.id)
        this.props = props
        this.styles = this.initStyles()
        this.positions = this.initElementPositions()

        this.isHovered.value = this.person.state.isHovered
        this.isDragging.value = this.person.state.isDragging
        this.isActive.value = this.person.state.isActive
    }

    public onMounted(el: Ref<SVGGraphicsElement|undefined>) {
        this.el = el
        this.setBBox()
    }

    public initStyles(): ComputedRef<PersonStyles> {
        return computed(() => ({...this.editor.options.defaultStyles, ...this.person.styles}))
    }

    public initElementPositions() {
        return computed<ElementPositions>(() => ({
            image: {
                    x: this.person.position.x - this.styles.value.imageSize.width,
                    y: this.person.position.y - this.styles.value.imageSize.height,
                    w: this.styles.value.imageSize.width * 2,
                    h: this.styles.value.imageSize.height * 2,
            },
            name: {
                    ...this.person.position, 
                    y: this.person.position.y + this.person.styles!.imageSize!.height + this.styles.value.fontSize + 10// with padding
            }
        }))
    }

    
    public onMouseEvent(eventType: MouseEventType, e: MouseEvent, args: MouseEventArgs) {
        let el = e.target as SVGGraphicsElement
        console.log(eventType)
        this.mouseEventMap[eventType].bind(this)(e, args)
        el.style.cursor = "pointer"
    }

    private onMouseOver(e: MouseEvent, args: MouseEventArgs) {
    }

    private onMouseMove(e: MouseEvent, args: MouseEventArgs) {
        this.setBBox()
    }
    
    private onMouseDown(e: MouseEvent, args: MouseEventArgs) {
    	console.log("EVENT FROM PERSON")
        this.family.setPersonState(this.person.id, "isActive", true)
    }
    
    private onMouseClick(e: MouseEvent, args: MouseEventArgs) {
        let activeState = this.family.getPerson(this.person.id)!.state.isActive
        this.family.setPersonState(this.person.id, "isActive", !activeState)
    }

    private onMouseUp(e: MouseEvent, args: MouseEventArgs) {
        this.family.setPersonState(this.person.id, "isActive", false)
    }

    private onMouseEnter(e: MouseEvent, args: MouseEventArgs) {
        this.family.setPersonState(this.person.id, "isHovered", true)
    }

    private onMouseLeave(e: MouseEvent, args: MouseEventArgs) {
        this.family.setPersonState(this.person.id, "isHovered", false)
    }
}