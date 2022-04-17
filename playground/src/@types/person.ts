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

export interface XPersonConstructor {
    id: string
    name: string
    photo: string
    location: Coordinate
}

export interface PersonElementPositions {
    image: Coordinate
    name: Coordinate
}
