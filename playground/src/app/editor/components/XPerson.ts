import { ComponentType } from "@/@types/component";
import type { Coordinate, MouseEventArgs, MouseEventType } from "@/@types/editor";
import type { PersonElementPositions, PersonMetadataInterface, PersonStyles, XPersonConstructor } from "@/@types/person"
import { useAppStore } from "@/stores/app";
import { computed, reactive, ref,  type ComputedRef, type Ref } from "vue";
import { XComponent } from "./XComponent";


export class XPerson extends XComponent {
    public id: string
    public metadata: PersonMetadataInterface
    public $emit: any
    public styles?: Partial<PersonStyles>
    public svgStyles = computed(() => ({
        stroke: "#000",
        fill: this.state.isHovered ? "#eee" : "transparent"
    }))

    public centerPosition: Coordinate
    public positions: {value:ComputedRef<PersonElementPositions>|null} = reactive({value: null})

    public isMounted: Ref<boolean> = ref<boolean>(false)

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
        this.isMounted = ref(false)

        this.metadata = {
            id: this.id,
            photo: props.photo,
            name: props.name,
        },
        
        this.centerPosition = props.location

        this.styles = this.initStyles()
        this.positions.value = this.initPersonElementPositions()

    }

    public onMounted(el: Ref<SVGGraphicsElement|null>) {
        this.el = el
        console.log(el.value)
        if(el.value !== null)
            this.setBBox(el)
    }

    public initStyles(): PersonStyles {
        const app = useAppStore().fatree
        return reactive({
            ...app.editor.options.defaultStyles
        })
    }

    public initPersonElementPositions() {
        return computed<PersonElementPositions>(() => ({
            image: reactive({
                    x: this.centerPosition.x - this.styles!.imageSize!.width,
                    y: this.centerPosition.y - this.styles!.imageSize!.height,
                    w: this.styles!.imageSize!.width * 2,
                    h: this.styles!.imageSize!.height * 2,
            }),
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
        const app = useAppStore().fatree
        
        if(!e.ctrlKey) {
            app.people.clearAllActiveState()
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