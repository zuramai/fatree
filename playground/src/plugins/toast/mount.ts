import { h, render, type App } from "vue";
import type { ToastProps } from "./toast";

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

export default function mount(component: any, props: ToastProps, app: App, element?: HTMLElement) {
    let el: HTMLElement|null = element ? element : document.querySelector('body')
    let vNode: any = h(component, props)

    if (app && app._context) {
        vNode.appContext = app._context
    }

    render(vNode, el!)

    const destroy = () => {
        if(el) {
            render(null, el)
        }
        el = null
        vNode = null
    }

    return { vNode, el, destroy }
}