<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { faults } from '@/data/faults';

import { useUserStore } from '@/stores/user.store'


import Divider from 'primevue/divider';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';

import Textarea from 'primevue/textarea';

const $store = useUserStore();

const router = useRouter();
const solarFaults = ref(faults);
const symptoms = computed(() => {
    return solarFaults.value.reduce((acc, fault) => {
        return acc.concat(fault.symptoms);
    }, []).sort();
})

const selectedSymptoms = ref([]);
const severity = ref({});
const additionalInfo = ref('');
const loading = ref(false);

const results = computed(() => {
    return solarFaults.value.filter(fault => {
        return fault.symptoms.some(symptom => {
            return selectedSymptoms.value.some(value => {
                return symptom.includes(value);
            });
        });
    });
})

function troubleshoot() {
    loading.value = true;
    $store.setResults(results.value);
    
    setTimeout(() => {
        loading.value = false;
        router.push('/results');
    }, 3000);
    
}

</script>

<template>
    <main class="w-dvw overflow-y-scroll" style="height: calc(100dvh - 5rem)">
        <div class="p-5 lg:h-full w-full">
            <h1 class="font-medium text-2xl md:text-3xl">Troubleshooting Guide</h1>

            <div class="grid gap-2 md:grid-cols-2 md:gap-5 mt-3">
                <img class="animate__animated animate__slideInUp max-h-[30rem]" src="../assets/troubleshooting.png"
                    alt="troubleshooting">
                <p class="md:text-xl md:leading-8 lg:p-10 lg:leading-10">
                    Follow the troubleshooting guide to help you figure out whatever is wrong with your solar panels.
                    Our simple and intuitive UI makes it very easy to get started with solving all your solar panel
                    problems. It only takes a minute.
                </p>
            </div>

            <div class="hidden mt-20 lg:grid place-content-center w-full">
                <a href="#form">
                    <Button label="Scroll down" icon="pi pi-angle-double-down" />
                </a>
            </div>
        </div>


        <div class="p-5 lg:max-w-[45rem] mx-auto" id="form">
            <div class="bg-white rounded-md p-6 border-2 border-[--primary-color] shadow">
                <h1 class="text-center text-lg md:text-xl font-semibold">Fault Detector Form</h1>

                <div class="mt-10">
                    <label class="text-[--primary-color] font-medium" for="symptoms">Symptoms</label>
                    <MultiSelect id="symptoms" v-model="selectedSymptoms" filter display="chip" :options="symptoms"
                        placeholder="Select observed symptoms" class="w-full" />
                </div>

                <Divider />

                <div class="mt-5">
                    <label class="font-medium text-[--primary-color] block">Symptom severity (optional)</label>
                    <small>
                        On a scale of 1 - 100 indicate how severe are each of these symptoms, with 1 being mild and 100
                        being very severe.
                    </small>

                    <div class="hidden md:grid grid-cols-2 gap-4 mt-4">
                        <p class="font-semibold text-sm">Symptom</p>
                        <p class="font-semibold text-sm">Severity</p>
                    </div>

                    <div v-for="symptom in selectedSymptoms" class="grid md:grid-cols-2 gap-4 mt-4">
                        <p><span class="md:hidden font-semibold">Symptom:</span> {{ symptom }}</p>

                        <p class="md:hidden font-semibold">Severity:</p>
                        <div class="grid gap-4">
                            <Slider v-model="severity[symptom]" :step="10" class="w-full" />
                            <InputText v-model.number="severity[symptom]" class="w-full mb-3" />
                        </div>
                    </div>
                </div>

                <Divider />

                <div class="mt-5">
                    <label class="font-medium text-[--primary-color] block">Additional Information (optional)</label>
                    <Textarea v-model="additionalInfo" rows="5" cols="30" autoResize class="mt-3 w-full" />
                </div>

                <div class="mt-5">
                    <label class="font-medium text-[--primary-color] block">Attach Pictures or Documents (optional)</label>

                    <input type="file" name="file" id="file" multiple
                        class="mt-3 w-full border border-[--primary-color] rounded-md p-3">
                </div>

                <div class="mt-5">
                    <Button @click="troubleshoot" label="Submit" :loading="loading"
                        :disabled="!selectedSymptoms.length" />
                </div>
            </div>
        </div>

        <div class="p-5 mt-10 bg-blue-100 text-xs font-medium text-center">
            <p>
                &COPY;SOLARCARE 2024. All rights reserved.
            </p>
        </div>

    </main>
</template>

<style scoped></style>