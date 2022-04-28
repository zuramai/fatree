import { Fatree } from "@/app";
import AppVue from "@/App.vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore('app', () => { 
    const fatree = reactive(new Fatree())

    return {
        fatree
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}