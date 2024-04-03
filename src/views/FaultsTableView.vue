<script setup>
import { ref, computed } from 'vue';

import Divider from 'primevue/divider';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { faults } from '@/data/faults';

const value = ref('')

const solarFaults = ref(faults);

const filteredFaults = computed(() => {
    return solarFaults.value.filter(fault => fault.keywords.some(keyword => keyword.includes(value.value.trim().toLowerCase())))
})

</script>

<template>
    <Divider />
    <main class="px-5 pb-5 w-full">
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="value" placeholder="Search" />
        </IconField>

        <div class="w-full overflow-scroll text-sm mt-3">
            <table>
                <thead>
                    <tr class="text-left">
                        <th class="p-1">Name</th>
                        <th class="p-1">Image</th>
                        <th class="p-1">Summary</th>
                        <th class="p-1">Symptoms</th>
                        <th class="p-1">Causes</th>
                        <th class="p-1">Troubleshoot</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(fault, index) in filteredFaults" :key="fault.id" class="border-b">
                        <td class="py-1 pr-3 min-w-40 max-w-80 font-semibold">{{ index + 1}}. {{ fault.name }}</td>

                        <td class="py-1 pr-3 min-w-40 max-w-60 overflow-hidden object-cover">
                            <img :src="fault.url" alt="">
                        </td>

                        <td class="py-1 pr-3 min-w-40 max-w-60">{{ fault.summary }}</td>

                        <td class="py-1 pr-3 min-w-40">
                            <ul class="list-disc max-w-60">
                                <li v-for="symptom in fault.symptoms">{{ symptom }}</li>
                            </ul>
                        </td>

                        <td class="py-1 pr-3 min-w-40">
                            <ul class="list-disc max-w-60">
                                <li v-for="cause in fault.causes">{{ cause }}</li>
                            </ul>
                        </td>

                        <td class="py-1 pr-3 min-w-40">
                            <ul class="list-disc max-w-60">
                                <li v-for="step in fault.troubleshooting">{{ step.description }}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
    <div class="p-5 mt-5 text-xs font-semibold flex flex-col items-center justify-center">
        <img src="../assets/chatbot.svg" alt="chatbot" class="max-h-60 rounded-full">
        <p class="text-center">
            Can't find what you're looking for?
            <br>
            Click the floating icon at the bottom right of the screen to chat with PanelPal, our state of the art AI
            chatbot.
            <br>
        </p>

    </div>
    <div class="p-5 mt-10 bg-blue-100 text-xs font-medium text-center">
        <p>
            &COPY;SOLARCARE 2024. All rights reserved.
        </p>
    </div>
</template>