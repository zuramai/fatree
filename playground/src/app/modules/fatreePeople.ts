import type { Coordinate } from "@/@types/editor";
import { useEditorStore } from "@/stores/editor";
import { useFamilyStore } from "@/stores/family";
import { XPerson, type XPersonConstructor } from "../editor/components/XPerson";
import { v4 as uuidv4 } from 'uuid';
import { reactive } from "vue";

export class FatreePeople {
    public people: {[id: string]: XPerson} = reactive({})
    public family = useFamilyStore()
    public editor = useEditorStore()
    
    addPerson(data: Partial<XPersonConstructor>) {
        let person = new XPerson({
            id: uuidv4(),
            location: data.location!,
            name: data.name!,
            photo: data.photo!
        })

        this.people[person.id] = person

        return person
    }

    getPerson(id: string) {
        return this.people[id]
    }

    removePerson(personId: string) {
        delete this.people[personId]
    }

    movePerson(i: number, position: Coordinate) {
        this.family.movePerson(i, position)
    }
}