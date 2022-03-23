export interface Person {
    /**
     * Person name
     */
    name: string

    /**
     * Image URL
     */
    img: string
}

export interface FamilyRootState {
    people: Person[]
}