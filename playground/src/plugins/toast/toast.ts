import Toast from "./Toast.vue"
import type { App } from 'vue'
import mount from "./mount"

export interface ToastProps {
    bg?: string
    text?: string
    position: string
    duration?: number
    cancelBtn?: boolean
    textAlign?: "center" | "left" | "right"
}

const toastPropDefaults: ToastProps = {
    bg: "primary",
    position: "top-center",
    text: "",
    duration: 3000,
    cancelBtn: true,
    textAlign: "right"
}

export default {
    install: (app: App) => {
        app.config.globalProperties.$toast = (propOption: ToastProps) => {
            let props = {...toastPropDefaults, ...propOption}
            const t =  mount(Toast, props, app)
            setTimeout(() => {
                t.destroy()
            }, props.duration)
            return t
        }
    }
}