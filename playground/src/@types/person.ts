import type { ComponentState, TheComponent } from "./component"
import type { Coordinate, Size } from "./editor"

export interface PersonStyles {
    fontSize: number
    imageSize: Size
}

export interface Person extends TheComponent {
    id: string

    /**
     * Person name
     */
    name: string

    /**
     * Image URL 
     */
    img: string
    
    /**
     * In-editor Coordinate
     */
    position: Coordinate

    /**
     * Individual image size, default is based on EditorOptions.imageSize
     */
    styles?: Partial<PersonStyles>
    
    /**
     * Person's SVG bounding box
     */
    bbox?: DOMRect

}