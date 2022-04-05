import type { ComponentState } from '@/@types/component'
import type { Coordinate } from '@/@types/editor'
import type { FamilyRootState, Person } from '@/@types/family'
import { v4 as uuidv4 } from 'uuid'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFamilyStore = defineStore('family', {
    state: (): FamilyRootState => {
        return {
            people: [],
            lines: [],
            relationships: [],
            
        }
    },
    getters: {
        filterPeople(state) {
            return (name: string) => {
                return state.people.filter(person => person.name.toLowerCase().includes(name.toLowerCase()))
            } 
        },
        filterPeopleByState(state) {
            return (s: keyof ComponentState) => {
                return state.people.filter(person => person.state[s] == true)
            } 
        },
        getPerson(state) {
            return (personId: string) => {
                return state.people.find((p) => p.id === personId)
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

            this.people.push(person)
            console.log(this.people)
        },
        removePerson(person: Person) {
            this.people.splice(this.people.indexOf(person), 1)
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