<script setup>
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
</script>

<template>
    <main class=" w-dvw bg-white grid gap-10 overflow-y-scroll" style="height: calc(100dvh - 5rem)">
        <div class="p-5 md:grid md:grid-cols-2 md:gap-x-5 lg:gap-y-5">
            <h1 class="font-semibold text-xl md:hidden">Common Solar Panel Faults</h1>
            <div class="overflow-hidden max-h-80 object-cover">
                <img class="animate__animated animate__slideInLeft" src="../assets/common_faults.png"
                    alt="common_faults">
            </div>
            <div>
                <div>
                    <h1 class="hidden md:block font-semibold text-xl md:text-2xl lg:text-3xl">Common Solar <br
                            class="hidden md:block"> Panel Faults</h1>
                    <p class="text-sm mt-1">
                        Check out our comprehensive list of common solar panel faults, symptoms, causes and
                        solutions.
                    </p>
                </div>
                <RouterLink to="/faults">
                    <Button label="View Common Faults" class="mt-3" />
                </RouterLink>
            </div>
        </div>

        <div class="p-5 md:grid md:grid-cols-2 md:gap-x-5 lg:gap-y-5">
            <h1 class="font-semibold text-xl md:hidden">Interactive Troubleshooting</h1>
            <div class="overflow-hidden max-h-80 object-cover">
                <img class="animate__animated animate__slideInRight" src="../assets/troubleshooting.png"
                    alt="troubleshooting">
            </div>
            <div>
                <div>
                    <h1 class="hidden md:block font-semibold text-xl md:text-2xl lg:text-3xl">Interactive <br
                            class="hidden md:block"> Troubleshooting</h1>
                    <p class="text-sm mt-1">
                        Enter the problems you notice with your panels and let the troubleshooting guide help you find a
                        solution.
                    </p>
                </div>

                <RouterLink to="/troubleshoot">
                    <Button severity="help" label="Troubleshoot" class="mt-3" />
                </RouterLink>

            </div>
        </div>

        <div class="p-5 bg-blue-100 text-xs font-medium text-center">
            <p>
                &COPY;SOLARCARE 2024. All rights reserved.
            </p>
        </div>
    </main>

</template>