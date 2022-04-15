import { ComponentType } from "@/@types/component";
import type { Coordinate, MouseEventArgs, MouseEventType } from "@/@types/editor";
import type { PersonMetadataInterface, PersonStyles } from "@/@types/person"
import { useEditorStore } from "@/stores/editor";
import { useFamilyStore } from "@/stores/family"
import { computed, reactive, ref, watch, type ComputedRef, type Ref } from "vue";
import { XComponent } from "./XComponent";

export interface XPersonConstructor {
    id: string
    name: string
    photo: string
    location: Coordinate
}

export interface PersonElementPositions {
    image: Coordinate
    name: Coordinate
}

export class XPerson extends XComponent {
    public id: string
    public family
    public editor
    public metadata: PersonMetadataInterface
    public $emit: any
    public styles?: Partial<PersonStyles>
    public svgStyles = computed(() => ({
        stroke: "#000",
        fill: this.state.isHovered ? "#eee" : "transparent"
    }))

    public centerPosition: Coordinate
    public positions: ComputedRef<PersonElementPositions>

    private _isMounted = false

    private _mouseEventMap: {[key in MouseEventType]: (e: MouseEvent) => void} = {
        "click": this.onMouseClick,
        "mouseover": this.onMouseOver,
        "mouseup": this.onMouseUp,
        "mousemove": this.onMouseMove,
        "mouseleave": this.onMouseLeave,
        "mouseenter": this.onMouseEnter,
        "mousedown": this.onMouseDown,
    }

    constructor( props: XPersonConstructor) {
        super(ComponentType.PERSON)
        this.id = props.id

        this.metadata = {
            id: this.id,
            photo: props.photo,
            name: props.name,
        },
        
        this.editor = useEditorStore()
        this.family = useFamilyStore()
        this.centerPosition = props.location

        this.styles = this.initStyles()
        this.positions = this.initPersonElementPositions()

    }

    public onMounted(el: Ref<SVGGraphicsElement|null>) {
        this._isMounted = true
        this.el = el
        console.log(el.value)
        if(el.value !== null)
            this.setBBox(el)
    }

    public initStyles(): PersonStyles {
        return reactive({
            ...this.editor.options.defaultStyles
        })
    }

    public initPersonElementPositions() {
        return computed<PersonElementPositions>(() => ({
            image: {
                    x: this.centerPosition.x - this.styles!.imageSize!.width,
                    y: this.centerPosition.y - this.styles!.imageSize!.height,
                    w: this.styles!.imageSize!.width * 2,
                    h: this.styles!.imageSize!.height * 2,
            },
            name: {
                    ...this.centerPosition, 
                    y: this.centerPosition.y + this.styles!.imageSize!.height + this.styles!.fontSize! + 10// with padding
            }
        }))
    }

    setLocation(location: Coordinate) {
        this.centerPosition = location
    }

    
    public onMouseEvent(eventType: MouseEventType, e: MouseEvent) {
        let el = e.target as SVGGraphicsElement
        this._mouseEventMap[eventType].bind(this)(e)
        el.style.cursor = "pointer"
    }

    private onMouseOver(e: MouseEvent) {
    }

    private onMouseMove(e: MouseEvent) {
        this.setBBox()
    }
    
    private onMouseDown(e: MouseEvent) {
    	console.log("EVENT FROM PERSON")
    }
    
    private onMouseClick(e: MouseEvent) {
       
        if(!e.ctrlKey) {
            this.family.clearAllActiveState()
        }

        // Set active state for this component
        this.state.isActive = !this.state.isActive
    }
    
    private onMouseUp(e: MouseEvent) {
    }

    private onMouseEnter(e: MouseEvent) {
        this.state.isHovered = true
    }

    private onMouseLeave(e: MouseEvent) {
        this.state.isHovered = false
    }
}