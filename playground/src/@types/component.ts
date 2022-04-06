import type { Coordinate } from "./editor"
import type { Line } from "./lines"
import type { Person } from "./person"

export interface ComponentState {
    isHovered: boolean,
    isActive: boolean,
    isDragging: boolean

    startDraggingAt?: Coordinate
}

export type TheComponent = {
    /**
     * Type of the component
     */
    type: "person" | "line" | "shape"
    
    /**
     * Person's in-editor current state 
     */
     state: ComponentState
}