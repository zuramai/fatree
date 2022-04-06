import type { ComponentState } from '@/@types/component'
import type { Coordinate } from '@/@types/editor'
import type { FamilyRootState } from '@/@types/family'
import { v4 as uuidv4 } from 'uuid'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Person } from '@/@types/person'

export const useFamilyStore = defineStore('family', {
    state: (): FamilyRootState => {
        return {
            people: {},
            lines: [],
            relationships: [],
        }
    },
    getters: {
        filterPeople(state) {
            return (name: string) => {
                return Object.values(state.people).filter(person => person.name.toLowerCase().includes(name.toLowerCase()))
            } 
        },
        filterPeopleByState(state) {
            return (s: keyof ComponentState) => {
                return Object.values(state.people).filter(person => person.state[s] == true)
            } 
        },
        getPerson(state) {
            return (personId: string): Person => {
                console.log('getting person ', personId)
                return state.people[personId] ?? null
            }
        },
        getBBox(state) {
            return (personId: number) => {
                return state.people[personId].bbox
            }
        }
    },
    actions: {
        setPersonState(personId: string, state: keyof ComponentState, value: any) {
            this.getPerson(personId)!.state[state] = value
        },
        addPerson(person: Person) {
            person.id = uuidv4()

            this.people[person.id] = (person)
            console.log(this.people)
        },
        removePerson(person: Person) {
            let ppl = Object.values(this.people)
            ppl.splice(ppl.indexOf(person), 1)
        },
        setPersonLocation(id: string, location: Coordinate) {
            this.getPerson(id)!.position = location
        },
        movePerson(i: number, amount: Partial<Coordinate>,) {
            this.people[i].position.x += amount.x ?? 0
            this.people[i].position.y += amount.y ?? 0
        }
    }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot))
}