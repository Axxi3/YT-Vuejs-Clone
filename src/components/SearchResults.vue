<template>
    <div class="flex flex-col md:flex-row items-start gap-4 p-4 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div class="w-full md:w-[30%]">
                <img :src="thumbnail" alt=""
                class="w-full h-full object-cover rounded-lg"/>
            </div>


            <div class="flex flex-1 flex-col justify-between">
                <h3 class="text-lg font-semibold text-white hover:text-blue-400 cursor-pointer">
                   {{title}}
                </h3>


                <div class="text-sm text-whitee mt-2">
                    <p>{{ ChannelTitle }}</p>
                    <p>{{ views }}</p>
                </div>
            </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    title:String,
    ChannelTitle:String,
    views:String,
    thumbnail:String,

})
</script>

<style lang="scss" scoped>

</style>