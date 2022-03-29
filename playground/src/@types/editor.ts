import type { PersonStyles } from "./family"

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