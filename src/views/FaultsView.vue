<script setup>
import { ref } from "vue";
import { RouterView, useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';

const $router = useRouter();
const $route = useRoute();

const routeList = '/faults';
const routeTable = 'faults/table';

function isCurrentRoute(route) {
    let splitRouteLength = route.split('/').length;
    return $route.path.endsWith(route.split('/')[splitRouteLength - 1]);
}

const menu = ref();
const items = ref([
    {
        label: 'View mode',
        items: [
            {
                label: 'List',
                icon: 'pi pi-list',
                command: () => $router.push('/faults')
            },
            {
                label: 'Table',
                icon: 'pi pi-table',
                command: () => $router.push('/faults/table')
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <main class="w-dvw overflow-y-scroll" style="height: calc(100dvh - 5rem)">
        <div class="p-5 flex justify-between">
            <h1 class="font-medium text-2xl md:text-3xl">Common Solar Panel Faults</h1>

            <div class="lg:hidden">
                <Button @click="toggle" type="button" outlined rounded icon="pi pi-ellipsis-v" class="flex-shrink-0" />

                <Menu ref="menu" :model="items" :popup="true" />
            </div>

            <div class="hidden lg:flex border rounded-md p-1 gap-2">
                <RouterLink to="/faults">
                    <Button icon="pi pi-list" text :severity="isCurrentRoute(routeList)? 'primary': 'secondary'" />
                </RouterLink>

                <RouterLink to="/faults/table">
                    <Button icon="pi pi-table" text :severity="isCurrentRoute(routeTable) ? 'primary' : 'secondary'" />
                </RouterLink>
            </div>
        </div>
        
        <RouterView />
    </main>
</template>