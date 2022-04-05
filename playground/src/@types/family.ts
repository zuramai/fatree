import type { ComponentState } from "./component"
import type { Coordinate, EditorOptions, Size } from "./editor"

export interface PersonStyles {
    fontSize: number
    imageSize: Size
}
export interface Person {
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

    /**
     * Person's in-editor current state 
     */
    state: ComponentState
}

export interface Relationship {
    
}

export interface FamilyRootState {
    /**
     * Collection of person
     */
    people: Person[]

    /**
     * Lines that connects people
     */
    lines: []

    /**
     * Relationship between people
     */
    relationships: Relationship[]

}