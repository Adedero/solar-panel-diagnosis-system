<script setup>
import { ref, computed } from 'vue';
import VTab from '@/components/VTab.vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Divider from 'primevue/divider';
import { faults } from '@/data/faults';

const value = ref('')

const solarFaults = ref(faults);

const filteredFaults = computed(() => {
    return solarFaults.value.filter(fault => fault.keywords.some(keyword => keyword.includes(value.value.trim().toLowerCase())))
})

</script>

<template>
    <Divider />
    <main class="px-5 pb-5 w-full lg:w-[50rem] xl:w-[60rem] lg:mx-auto">
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="value" placeholder="Search" class="w-full" />
        </IconField>

        <div class="mt-5 ">
            <div v-for="(fault, index) in filteredFaults" :key="fault.id" class="mb-5 lg:text-lg">
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
        </div>


    </main>
    <div class="p-5 mt-10 bg-blue-100 text-xs font-medium text-center">
        <p>
            &COPY;SOLARCARE 2024. All rights reserved.
        </p>
    </div>
</template>