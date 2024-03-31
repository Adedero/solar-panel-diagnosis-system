<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Divider from 'primevue/divider';

const visible = ref(false);
</script>

<template>
    <header class="overflow-hidden bg-blue-100 flex items-center justify-between p-4 h-20">
        <div class="flex items-center gap-1">
            <img src="/logo_wordless.png" alt="logo" class="w-8">
            <div class="flex items-center uppercase font-medium text-3xl">
                <p>Solar</p>
                <p class="text-[--blue-600]">Care</p>
            </div>
        </div>

        <div class="hidden lg:flex font-semibold text-sm items-center gap-4">
            <RouterLink to="/">HOME</RouterLink>
            <RouterLink to="/faults">COMMON FAULTS</RouterLink>
            <RouterLink to="/troubleshoot">TROUBLESHOOT</RouterLink>
        </div>

        <Button @click="visible = true" outlined icon="pi pi-bars" class="lg:hidden" />
    </header>
    <main id="main">
        <RouterView />
    </main>
    <Sidebar v-model:visible="visible" header="SolarCare" position="right">
        <Divider />
        <div class="flex flex-col font-semibold gap-8">
            <RouterLink @click="visible = false" to="/">HOME</RouterLink>
            <RouterLink @click="visible = false" to="/faults">COMMON FAULTS</RouterLink>
            <RouterLink @click="visible = false" to="/troubleshoot">TROUBLESHOOT</RouterLink>
        </div>
    </Sidebar>
</template>

<style>
html {
    scroll-behavior: smooth;
}

body {
    font-family: Inter, sans-serif;
    height: 100dvh;
    width: 100dvw;
    overflow: hidden;
    color: var(--text-color);
    background-color: var(--surface-50);
}

.router-link-exact-active {
    color: var(--blue-600);
}
</style>
