import type { Coordinate, MouseEventArgs, MouseEventType } from "@/@types/editor";
import type { Person, PersonStyles } from "@/@types/family"
import { useFamilyStore } from "@/stores/family"
import { computed, reactive, ref, type ComputedRef, type Ref } from "vue";
import { XComponent } from "./XComponent";

export interface Props {
    person: Person
    id: number,
    hoverColor?: string
}

export interface ElementPositions {
    image: Coordinate
    name: Coordinate
}

export class XPerson extends XComponent {
    public family
    public person: Person
    public props: Props
    public styles: ComputedRef<PersonStyles>
    public positions: ComputedRef<ElementPositions>
    public svgStyles = computed(() => ({
        stroke: this.isHovered.value ? "#000" : "transparent",
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
        
        this.family = useFamilyStore()
        this.person = this.family.people[props.id]
        this.props = props
        this.styles = this.initStyles()
        this.positions = this.initElementPositions()
    }

    public initStyles(): ComputedRef<PersonStyles> {
        return computed(() => ({...this.family.options.defaultStyles, ...this.person.styles}))
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
                    ...this.props.person.position, 
                    y: this.props.person.position.y + this.props.person.styles!.imageSize!.height + this.styles.value.fontSize + 10// with padding
            }
        }))
    }
    
    public onMouseEvent(eventType: MouseEventType, e: MouseEvent, args: MouseEventArgs) {
        let el = e.target as SVGGraphicsElement
        console.log(eventType)
        this.mouseEventMap[eventType].bind(this)(e, args)
        this.calculateBBox()
        el.style.cursor = "pointer"
    }

    private onMouseOver(e: MouseEvent, args: MouseEventArgs) {
    }

    private onMouseMove(e: MouseEvent, args: MouseEventArgs) {
        console.log(this.isHolding.value);
        
        if(this.isHolding.value) {
            let oldLoc = this.holdingFrom
            let mousePos = args.mousePosition.value

            let newLocation: Coordinate = { 
                x: oldLoc.component.x + (mousePos.x - oldLoc.mouse.x),
                y: oldLoc.component.y  + (mousePos.y - oldLoc.mouse.y)
            }
            this.family.movePerson(this.props.id, newLocation)
        }
    }
    
    private onMouseDown(e: MouseEvent, args: MouseEventArgs) {
        this.isHolding.value = true
        this.holdingFrom.mouse = args.mousePosition.value
        this.holdingFrom.component = {x: this.person.position.x, y: this.person.position.y}
        console.log("holding from ", this.holdingFrom);
    }
    
    private onMouseClick(e: MouseEvent, args: MouseEventArgs) {
    }

    private onMouseUp(e: MouseEvent, args: MouseEventArgs) {
        this.isHolding.value = false
    }

    private onMouseEnter(e: MouseEvent, args: MouseEventArgs) {
        console.log("mouseentersasdasds");
        
        this.isHovered.value = true
        this.bbox.value = (this.el.value as SVGGraphicsElement).getBBox()
    }

    private onMouseLeave(e: MouseEvent, args: MouseEventArgs) {
        this.isHovered.value = false
    }
}