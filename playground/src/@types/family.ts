import type { XPerson } from "@/app/editor/components/XPerson"
import type { Line } from "./lines"

export interface Relationship {
    person1: XPerson // Ini buat bapak
    person2: XPerson // Ini buat ibu
    to?: XPerson[] // Optional, ini buat anak. Kalo gapunya anak, null aja.
    line: Line // SVG Line yang menghubungkan antar-orang
}

export interface FamilyRootState {
    /**
     * Collection of person
     * personId: Person
     */
    people: {[id: string]: XPerson}

    /**
     * Lines that connects people
     */
    lines: Line[]

    /**
     * Relationship between people
     */
    relationships: Relationship[]
}