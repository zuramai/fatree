import { useFamilyStore } from "@/stores/family";
import type { Person, PersonStyles } from "@/types/family";
import { computed } from "vue";

const family = useFamilyStore()

export function getPersonStyles(person: Person){
    return computed(() => Object.assign(family.options.defaultStyles, person.styles))
}