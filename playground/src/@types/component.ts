import type { Coordinate } from "./editor"

export interface ComponentState {
    isHovered: boolean,
    isActive: boolean,
    isDragging: boolean

    startDraggingAt?: Coordinate
}