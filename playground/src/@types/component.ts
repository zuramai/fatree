import type { Coordinate } from "./editor"

export interface ComponentState {
    isHovered: boolean,
    isActive: boolean,
    isDragging: boolean

    startDraggingAt?: Coordinate
}

export enum ComponentType {
    PERSON = "person",
    LINE = "line",
    SHAPE = "shape"
}

export type ComponentInterface = {
    /**
     * Type of the component
     */
    type: ComponentType
    
    /**
     * Person's in-editor current state 
     */
    state: ComponentState
}