<script setup lang="ts">
import IconAdd from '~icons/carbon/add-alt'
import IconHome from '~icons/carbon/home'
import IconSettings from '~icons/carbon/settings'
import IconUser from '~icons/carbon/user'
import SidebarItem from './SidebarItem.vue'
import Logo from '../../images/Logo.vue'
</script>

<template>
    <div class="sidebar">
        <div class="sidebar__menu-wrapper icon-only">

            <!-- Top menu: for logo placement -->
            <ul class="sidebar__menu">
                <sidebar-item>
                    <router-link  to="/" class="sidebar__link ">
                        <logo/>
                    </router-link>
                </sidebar-item>
            </ul>

            <!-- Middle menu: the main menu -->
            <ul class="sidebar__menu">
                <sidebar-item>
                    <router-link  to="/" class="sidebar__link btn btn--link">
                        <icon-home/>
                    </router-link>
                </sidebar-item>
                <sidebar-item>
                    <router-link  to="/" class="sidebar__link btn btn--link">
                        <icon-add/>
                    </router-link>
                </sidebar-item>
            </ul>

            <!-- Bottom menu: settings and user menu -->
            <ul class="sidebar__menu">
                <sidebar-item>
                    <router-link  to="/" class="sidebar__link btn btn--link">
                        <icon-settings/>
                    </router-link>
                </sidebar-item>
                <sidebar-item>
                    <router-link  to="/" class="sidebar__link btn btn--link">
                        <icon-user/>
                    </router-link>
                </sidebar-item>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/layouts/sidebar";
</style>