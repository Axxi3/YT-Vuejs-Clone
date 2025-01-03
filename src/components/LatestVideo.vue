<template>
    <div class="video-preview w-[100%] flex flex-col md:flex-row p-4 border-b border-gray-700 hover:border-gray-900 transition duration-300">

        <div class="thumbnail relative w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
            <img :src="thumbnail" 
            class="w-full h-full object-cover rouned-md aspect-[16/9]"
            alt=""/>

            <span class="duration absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs font-semibold px-1
            py-0.5 rounded">
        {{ duration }}</span>
        </div>


        <div class="mt-3 md:mt-0 md:ml-4 flex-1">
            <h3 class="text-lg font-semibold text-white truncate"> {{ title }}</h3>

            <div class="flex items-center justify-start gap-3">
                <span class="text-sm text-gray-500 mt-1">
                {{ channelName }}
            </span>
            <CheckCircle :size="17" />
            </div>
           

            <p class="description text-sm text-gray-400 mt-2 over-hidden overflow-ellipsis line-clamp-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                 aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
   import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
   import { defineProps } from 'vue'

   defineProps({
    title: String,
    channelName: String,
    description:String,
    thumbnail:String,
    duration:String
   })
</script>

<style lang="scss" scoped>

</style>