import type { FamilyRootState, Person } from '@/@types/family'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFamilyStore = defineStore('family', {
    state: (): FamilyRootState => {
        return {
            people: [],
            relationships: [],
            
            // Default options
            options: {
                defaultStyles: {
                    imageSize: {
                        width: 75,
                        height: 75
                    },
                    fontSize: 24
                }
            }
        }
    },
    getters: {
        filterPeople(state) {
            return (name: string) => {
                console.log(name)
                return state.people.filter(person => person.name.toLowerCase().includes(name.toLowerCase()))
            } 
        }
    },
    actions: {
        addPerson(person: Person) {
            this.people.push(person)
            console.log(this.people)
        },
        removePerson(person: Person) {
            this.people.splice(this.people.indexOf(person), 1)
        }
    }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot))
}