<script setup>
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
</script>

<template>
    <!-- Small Screens -->
    <main class="lg:hidden w-dvw p-5 bg-white" style="height: calc(100dvh - 5rem)">
        <div class="">
            <h1 class="text-[--blue-600] text-4xl font-medium text-center">SOLAR<span class="text-amber-500">CARE</span>
            </h1>

            <div class="max-w-96 max-h-96 object-fill mx-auto overflow-hidden">
                <img class="animate__animated animate__slideInUp" src="../assets/vector_1.svg" alt="solar_panel_repair">
            </div>

            <p class="animate__animated animate__slideInUp text-center">Your number one solution to solar panel faults
                and problems.</p>
        </div>

        <div class="flex flex-col items-center justify-center gap-3 mt-12">
            <RouterLink to="/selection" class="animate__animated animate__slideInRight">
                <Button label="Let's Get Started" />
            </RouterLink>

            <Button label="Contact Us" severity="secondary" icon="pi pi-external-link"
                class="animate__animated animate__slideInLeft" />
        </div>
    </main>

    <!-- Larger Screens -->
    <main class="hidden lg:grid w-dvw bg-white grid-cols-2" style="height: calc(100dvh - 5rem)">
        <div class="max-h-[40rem] object-fill overflow-hidden">
            <img src="../assets/vector_1.svg" alt="solar_panel_repair">
        </div>

        <div class="p-5 grid place-content-center">
            <h1 class="text-[--blue-600] text-6xl font-medium text-center">SOLAR<span class="text-amber-500">CARE</span>
            </h1>

            <p class="text-center font-medium text-lg mt-3">Your number one solution to <br> solar panel faults and
                problems.</p>

            <div class="flex items-center justify-center gap-3 mt-16">
                <RouterLink to="/selection">
                    <Button label="Let's Get Started" />
                </RouterLink>

                <Button label="Contact Us" severity="secondary" icon="pi pi-external-link" />
            </div>
        </div>


    </main>
</template>