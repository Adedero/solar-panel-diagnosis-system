<script setup>
import { ref } from "vue";
import axios from "axios";
import OverlayPanel from 'primevue/overlaypanel';
import InputText from "primevue/inputtext";
import InputGroup from 'primevue/inputgroup';
import Button from "primevue/button";
import { marked } from 'marked';
import model from '@/config/gemini.config'

const focuser = ref(null);
const newMessage = ref('');
const loading = ref(false);
const messages = ref([]);

async function sendMessage() {
    if (!newMessage.value.trim()) return;
    
    focuser.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center', 
    });

    setTimeout(() => {
        loading.value = true;
    }, 500);
    
    const prompt = newMessage.value.trim();

    messages.value.push({ sender: 'user', text: newMessage.value });
    
    newMessage.value = '';

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        messages.value.push({ sender: 'chatbot', text: text });
        
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}

</script>

<template>
    <div class="fixed z-50 bottom-9 right-5">
        <button @click="toggle" type="button" class="hover:scale-125 transition-transform"
            v-tooltip="'Start live chat'">
            <img src="../assets/chat_icon.svg" alt="chat-icon" class="w-14">
        </button>
    </div>

    <OverlayPanel ref="op" class=" w-dvw md:w-[25rem]">
        <div class="flex flex-col gap-1">
            <h1 class="font-semibold text-xl">Panel<span class="text-[--primary-color]">Pal</span></h1>
            <small>Can't seem to find what you're looking for? Chat with our state of the art AI, PanelPal, to get more
                solutions.</small>
        </div>
        <div class="chatbox mt-3 border border-[--primary-color] rounded-md p-2 grid grid-rows-10 gap-1">
            <div class="row-span-9 bg-[--surface-ground] overflow-y-scroll w-full grid gap-3 place-content-start">
                <div class="p-2 bg-[--primary-color] rounded-tl-xl rounded-r-xl text-white max-w-[80%]">
                    Hi, there. I'm PanelPal 👋. How can I help you today?
                </div>

                <div v-for="message in messages">
                    <div v-if="message.sender === 'chatbot'" v-html="marked(message.text)"
                        class="p-2 bg-[--primary-color] rounded-tl-xl rounded-r-xl text-white max-w-[80%]">
                    </div>

                    <div v-else
                        class="user p-2 bg-[--green-500] rounded-tr-xl rounded-l-xl text-white max-w-[80%] ml-auto">
                        {{ message.text }}
                    </div>

                </div>

                <div v-if="loading" class="p-2 bg-[--primary-color] rounded-xl max-w-20 grid place-content-center">
                    <div class="loader"></div>
                </div>

                <div class="h-16"></div>
                <div class="h-1" ref="focuser"></div>
            </div>

            <InputGroup class="row-span-1">
                <InputText v-model="newMessage" @keyup.enter="sendMessage" placeholder="Enter your message." />
                <Button @click="sendMessage" icon="pi pi-send" />
            </InputGroup>
        </div>
    </OverlayPanel>
</template>

<style scoped>
.chatbox {
    height: calc(100dvh - 18rem);
}

/* HTML: <div class="loader"></div> */
.loader {
    width: 40px;
    aspect-ratio: 2;
    --_g: no-repeat radial-gradient(circle closest-side, #FFF 90%, #0000);
    background:
        var(--_g) 0% 50%,
        var(--_g) 50% 50%,
        var(--_g) 100% 50%;
    background-size: calc(100%/3) 50%;
    animation: l3 1s infinite linear;
}

@keyframes l3 {
    20% {
        background-position: 0% 0%, 50% 50%, 100% 50%
    }

    40% {
        background-position: 0% 100%, 50% 0%, 100% 50%
    }

    60% {
        background-position: 0% 50%, 50% 100%, 100% 0%
    }

    80% {
        background-position: 0% 50%, 50% 50%, 100% 100%
    }
}
</style>