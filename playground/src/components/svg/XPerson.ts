import type { Coordinate, MouseEventType } from "@/@types/editor";
import type { Person, PersonStyles } from "@/@types/family"
import { useFamilyStore } from "@/stores/family"
import { computed, reactive, ref, type ComputedRef, type Ref } from "vue";

export interface Props {
    person: Person
    id: number,
    hoverColor?: string
}

export interface ElementPositions {
    image?: ComputedRef<Coordinate>
    name?: ComputedRef<Coordinate>
}

export class XPerson {
    public family
    public props: Props
    public styles: ComputedRef<PersonStyles>
    public positions: ElementPositions
    public svgStyles = computed(() => ({
        stroke: this.isHovered.value ? "#000" : "transparent",
        fill: this.isHovered.value ? "#eee" : "transparent"
    }))

    public personEl: Ref<SVGGraphicsElement|undefined> = ref()
    public bbox: Ref<Partial<DOMRect>> = ref<Partial<DOMRect>>({x: 0, y:0, width: 0, height: 0});

    public isFocus: Ref<boolean> = ref(false)
    public isHovered: Ref<boolean> = ref(false)
    public isHolding: Ref<boolean> = ref(false)

    constructor(props: Props) {
        this.family = useFamilyStore()
        this.props = props
        this.styles = this.initStyles()
        this.positions = this.initElementPositions()
        
    }

    public initStyles(): ComputedRef<PersonStyles> {
        return computed(() => Object.assign(this.family.options.defaultStyles, this.props.person.styles))
    }

    public initElementPositions(): ElementPositions {
        return {
            image: computed(() => {
                return {
                    x: this.props.person.position.x - this.styles.value.imageSize.width,
                    y: this.props.person.position.y - this.styles.value.imageSize.height,
                    width: this.styles.value.imageSize.width * 2,
                    height: this.styles.value.imageSize.height * 2,
                }
            }),
            name: computed<Coordinate>(() => {
                return {
                    ...this.props.person.position, 
                    y: this.props.person.position.y + this.props.person.styles!.imageSize!.height + this.styles.value.fontSize + 10// with padding
                }
            })
        }
    }

    public getNamePosition() {
        return computed(() => { 
            return {
                ...this.props.person.position, 
                y: this.props.person.position.y + this.props.person.styles!.imageSize!.height + this.styles.value.fontSize + 10// with padding
            }
        })
    }

    public onMouseEvent(eventType: MouseEventType, e: MouseEvent) {
        let el = e.target as SVGGraphicsElement

        if(eventType == 'mouseover') this.onMouseOver(e)
        else if(eventType == 'mouseleave') this.onMouseLeave(e)

        el.style.cursor = "pointer"
    }

    private onMouseOver(e: MouseEvent) {
        this.isHovered.value = true
        this.bbox.value = (this.personEl.value as SVGGraphicsElement).getBBox()
    }
    private onMouseLeave(e: MouseEvent) {
        this.isHovered.value = false
    }
}