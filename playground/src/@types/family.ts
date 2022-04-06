import type { Person, PersonStyles } from "@/@types/person"
import type { Line } from "./lines"

export interface Relationship {
    person1: Person // Ini buat bapak
    person2: Person // Ini buat ibu
    to?: Person[] // Optional, ini buat anak. Kalo gapunya anak, null aja.
    line: Line // SVG Line yang menghubungkan antar-orang
}

export interface FamilyRootState {
    /**
     * Collection of person
     * personId: Person
     */
    people: {[id: string]: Person}

    /**
     * Lines that connects people
     */
    lines: Line[]

    /**
     * Relationship between people
     */
    relationships: Relationship[]
}