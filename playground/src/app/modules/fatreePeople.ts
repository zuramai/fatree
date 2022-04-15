import type { Coordinate } from "@/@types/editor";
import { useEditorStore } from "@/stores/editor";
import { useFamilyStore } from "@/stores/family";
import { XPerson, type XPersonConstructor } from "../editor/components/XPerson";
import { v4 as uuidv4 } from 'uuid';
import { reactive } from "vue";
import type { ComponentState } from "@/@types/component";

export class FatreePeople {
    public people: {[id: string]: XPerson} = reactive({})
    public family = useFamilyStore()
    public editor = useEditorStore()
    
    addPerson(data: Omit<XPersonConstructor, "id">) {
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

    movePerson(id: string, position: Coordinate) {
        this.getPerson(id).setLocation(position)
    }

    filterPeopleByName(name: string) {
        return Object.values(this.people).filter(person => person.metadata.name.includes(name))
    }
    filterPeopleById(ids: string[]) {
        let people = []
        for(let i = 0; i < ids.length; i++) {
            if (this.people[ids[i]])
                people.push(this.people[ids[i]])
        }
    }

    filterPeopleByState<T extends keyof ComponentState>(s: T, v: ComponentState[T]) {
        return Object.values(this.people).filter(person => person.state[s] == v)
    }
}