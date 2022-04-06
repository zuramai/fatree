import type { EditorRootState } from "@/@types/editor";
import { defineStore } from "pinia";

export const useEditorStore = defineStore('editor', {
    state: (): EditorRootState => {
        return {
            activeComponents: [],
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
    }
})