<script setup lang="ts">
import IconAdd from '~icons/carbon/add-alt'
import IconHome from '~icons/carbon/home'
</script>

<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <ul>
                <li>
                    <router-link to="/">
                        <icon-home/>
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        <icon-add/>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/layouts/sidebar";
</style>