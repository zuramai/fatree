import type { Ref } from "vue"
import type { TheComponent } from "./component"
import type { PersonStyles } from "./person"

export type MouseEventType = "click" | "mouseover" | "mousemove" | "mousedown" | "mouseup" | "mouseleave" | "mouseenter"
export type KeyboardEventType = "keydown" | "keyup" | "keypress"

export interface Coordinate {
    x: number
    y: number
    w?: number
    h?: number
}

export interface Size {
    width: number
    height: number
}

export interface LineInterface {
    
}

export interface EditorOptions {
    backgroundSrc?: string,
    defaultStyles: PersonStyles   
}

export interface MouseEventArgs {
    mousePosition: Ref<Coordinate>
}

export interface EditorRootState {
    svg: SVGGraphicsElement|null
    
    /**
     * The current mouse position
     */
    mousePosition: Coordinate

    /**
     * Save the mouse position when user mouse down
     */
    mouseHoldingFrom: Coordinate

    isMouseDown: boolean

    /**
     * Currently active component
     */
    activeComponents: TheComponent[]

    /**
     * Contains settings like font size, background, etc.
     */
    options: EditorOptions
}