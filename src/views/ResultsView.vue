<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import VTab from '@/components/VTab.vue'
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const solarFaults = ref(JSON.parse(sessionStorage.getItem('results')) || [])

function popup(choice) {
    if (choice === 'yes') {
        toast.add({
            severity: 'success',
            summary: 'Great!',
            detail: 'Thanks for your response. Glad we could help!',
            life: 5000,
        })
    } else {
        toast.add({
            severity: 'info',
            summary: 'Oops',
            detail: 'Thanks for your response. Do check back again as more features would be added soon.',
            life: 5000,
        })
    }
}
</script>

<template>
    <Toast class="w-[70dvw] md:w-[30rem]" />
    <main class="overflow-y-scroll w-dvw" style="height: calc(100dvh - 5rem)">
        <h1 class="p-5 font-semibold text-2xl md:text-3xl lg:text-center mt-1">Results</h1>
        <Divider />
        <div class="mt-5 p-5 lg:w-[50rem] xl:w-[60rem] lg:mx-auto">
            <div v-for=" (fault, index) in solarFaults" :key="fault.id" class="mb-5 lg:text-lg">
                <div>
                    <h1 class="font-semibold text-lg md:text-xl lg:text-2xl">{{ index + 1 }}. {{ fault.name }}</h1>
                    <p class="mt-2">{{ fault.summary }}</p>
                    <div class="mt-1 w-full min-h-fit max-h-96 overflow-hidden object-cover">
                        <img :src="fault.url" :alt="fault.name.split(' ').join('_')" :title="fault.name">
                    </div>
                    <a :href="fault.source" target="_blank">
                        <Button label="View source" icon-pos="right" icon="pi pi-external-link" text />
                    </a>
                </div>

                <div class="mt-2">
                    <div>
                        <h1 class="font-semibold">Symptoms</h1>
                        <ul class="list-disc ml-8">
                            <li v-for="symptom in fault.symptoms">{{ symptom }}</li>
                        </ul>
                    </div>

                    <div class="mt-2">
                        <h1 class="font-semibold">Causes</h1>
                        <ul class="list-disc ml-8">
                            <li v-for="cause in fault.causes">{{ cause }}</li>
                        </ul>
                    </div>

                    <v-tab header="Troubleshooting" class="mt-2">
                        <ul class="list-disc">
                            <li v-for="(item, index) in fault.troubleshooting" :key="index"
                                class="md:hidden mt-1 flex flex-col">
                                <p class="font-semibold">{{ index + 1 }}. {{ item.title }}:</p>
                                <p class="ml-4">{{ item.description }}</p>
                            </li>

                            <li v-for="(item, index) in fault.troubleshooting" :key="index"
                                class="hidden mt-2 md:block">
                                <span class="font-semibold">{{ `${index + 1}. ${item.title}:` }}</span>
                                <span>{{ ` ${item.description}` }}</span>
                            </li>
                        </ul>
                    </v-tab>
                </div>
            </div>

            <div class="mt-10 grid place-content-center">
                <p class="text-red-500">Are you satisfied with these results?</p>
                <div class="flex flex-col gap-6 md:flex-row mt-3">
                    <Button @click="popup('yes')" label="Absolutely!" severity="success" />
                    <Button @click="popup('no')" label="No, I'm not." severity="help" />
                </div>

            </div>

            <div class="mt-5 grid place-content-center">
                <RouterLink to="/troubleshoot">
                    <Button severity="secondary" text icon="pi pi-undo" label="Back to Troubleshoot" />
                </RouterLink>
            </div>
        </div>

        <div class="p-5 mt-10 bg-blue-100 text-xs font-medium text-center">
            <p>
                &COPY;SOLARCARE 2024. All rights reserved.
            </p>
        </div>
    </main>

</template>