import { Fatree } from "@/app";
import AppVue from "@/App.vue";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore('app', () => { 
    const fatree = reactive(new Fatree())
    const a = ref("")

    return {
        fatree,
        a
    }
})