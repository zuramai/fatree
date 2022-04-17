import type { ComponentState } from '@/@types/component'
import type { Coordinate } from '@/@types/editor'
import type { FamilyRootState } from '@/@types/family'
import { v4 as uuidv4 } from 'uuid'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFamilyStore = defineStore('family', {
    
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot))
}