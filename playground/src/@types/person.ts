import type {  Size } from "./editor"

export interface PersonStyles {
    fontSize: number
    imageSize: Size
}

export interface PersonMetadataInterface {
    id: string

    /**
     * Person name
     */
    name: string

    /**
     * Image URL 
     */
    photo: string
    

}