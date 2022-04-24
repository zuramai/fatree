import type { Coordinate, EditorRootState } from "@/@types/editor";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const defaultEditorOptions = {
    defaultStyles: {
        imageSize: {
            width: 75,
            height: 75
        },
        fontSize: 24
    }
}

export class Editor implements EditorRootState {
    public options 
    public svg: SVGGraphicsElement|null = null
    public activeComponents = []
    
    // Mouse states
    public mousePosition = { x: 0, y: 0 }
    public mouseHoldingFrom = { x: 0, y: 0}
    public isMouseDown = false

    constructor() {
        this.options = reactive(defaultEditorOptions)
    }

    setSVG(svg: SVGGraphicsElement) {
        this.svg = svg
    }

    setMousePosition(clientX: number, clientY: number): Coordinate {
        const domPoint = new DOMPointReadOnly(clientX, clientY)
        const pt = domPoint.matrixTransform(this.svg!.getScreenCTM()!.inverse())
        this.mousePosition = { x: pt.x, y: pt.y }

        return this.mousePosition
    }

    setMouseHoldingFrom(pos: Coordinate) {
        this.mouseHoldingFrom = pos
    }
}