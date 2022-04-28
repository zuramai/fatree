import type { XComponent } from "@/app/editor/components/XComponent";


export type LineType = "wave" | "straight"

export interface XLineConstructor {
    id: string
    from: XComponent
    to: XComponent
    options?: LineOptions
}

export interface LineOptions {
    type?: LineType
    color?: string
}