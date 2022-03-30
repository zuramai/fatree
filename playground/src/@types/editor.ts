import type { PersonStyles } from "./family"

export type MouseEventType = "click" | "mouseover" | "mousedown" | "mouseup" | "mouseleave"
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