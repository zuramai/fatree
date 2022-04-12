import { useFamilyStore } from "@/stores/family"
import type { XLine } from "./editor/components/XLine"
import type { XPerson } from "./editor/components/XPerson"

export class Fatree {
    public people: XPerson[] = []
    public lines: XLine[] = []
    public family = useFamilyStore()
    
    constructor() {
        this.onMounted()
    }

    onMounted() {

    }

}

export function createFatree() {
    return new Fatree()
}