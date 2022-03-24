import type { Coordinate, EditorOptions, Size } from "./editor"

export interface PersonStyles {
    fontSize: number
    imageSize: Size
}
export interface Person {
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

}

export interface FamilyRootState {
    people: Person[]
    options: EditorOptions
}