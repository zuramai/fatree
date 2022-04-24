<script setup lang="ts">import { useAppStore } from '@/stores/app';


const app = useAppStore().fatree

function menuConnecting() {
    app.setMode("connecting")
}


</script>
<template>
    <div class="editor__topbar | rounded-lg flex p-3">
        <ul>
            <li>
                <a href="#" @click.prevent="menuConnecting" class="topbar__menu | px-2 py-1 hover:bg-gray-100 flex items-center gap-2">
                    <icon-carbon-app-connectivity/>
                    <span>Connect</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/components/editor-topbar";
</style>