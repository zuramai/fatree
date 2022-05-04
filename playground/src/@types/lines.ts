import type { XComponent } from "@/app/editor/components/XComponent";
import type { Coordinate } from "./editor";


export enum LineType {
    ORTHOGONAL = "ORTHOGONAL",
    CURVED = "CURVED",
    STRAIGHT = "STRAIGHT"
} 

export type LinePosition = "bottom" | "middle"

export interface LineTypePath {
    getD(from: Coordinate, to: Coordinate, position?: LinePosition): string
}

export interface XLineConstructor {
    id: string
    from: XComponent
    to: XComponent
    options?: LineOptions
}

export interface LineOptions {
    type?: LineType
    width?: number
    color?: string
}