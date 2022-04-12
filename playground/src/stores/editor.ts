import type { Coordinate, EditorRootState } from "@/@types/editor";
import { defineStore } from "pinia";

export const useEditorStore = defineStore('editor', {
    state: (): EditorRootState => {
        return {
            // Default options
            options: {
                defaultStyles: {
                    imageSize: {
                        width: 75,
                        height: 75
                    },
                    fontSize: 24
                }
            },
            svg: null,
            activeComponents: [],

            // Mouse states
            mousePosition: { x: 0, y: 0 },
            mouseHoldingFrom: { x: 0, y: 0},
            isMouseDown: false,
        }
    },
    actions: {
        setSVG(svg: SVGGraphicsElement) {
            this.svg = svg
        },
        setMousePosition(clientX: number, clientY: number): Coordinate {
            const domPoint = new DOMPointReadOnly(clientX, clientY)
            const pt = domPoint.matrixTransform(this.svg!.getScreenCTM()!.inverse())
            this.mousePosition = { x: pt.x, y: pt.y }
            
            return this.mousePosition
        },
        setMouseHoldingFrom(pos: Coordinate) {
            this.mouseHoldingFrom = pos
        }
    }
    
})