import type { ComponentState } from '@/@types/component'
import type { Coordinate } from '@/@types/editor'
import type { FamilyRootState } from '@/@types/family'
import { v4 as uuidv4 } from 'uuid'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFamilyStore = defineStore('family', {
    state: (): FamilyRootState => {
        return {
            people: {},
            lines: [],
            relationships: [],
        }
    },
    getters: {
        // getPerson(state) {
        //     return (personId: string): Person => {
        //         return state.people[personId] ?? null
        //     }
        // },
        getBBox(state) {
            return (personId: number) => {
                return state.people[personId].bbox
            }
        }
    },
    actions: {
        setPersonState(personId: string, state: keyof ComponentState, value: any) {
            this.people[personId].state[state] = value
        },
        
        clearAllActiveState() {
            Object.keys(this.people).forEach(personId => {
                this.setPersonState(personId, "isActive", false)
            })
        },
        
    }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot))
}