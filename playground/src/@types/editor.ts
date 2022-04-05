import type { Ref } from "vue"
import type { PersonStyles } from "./family"

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
    /**
     * Contains settings like font size, background, etc.
     */
    options: EditorOptions
}