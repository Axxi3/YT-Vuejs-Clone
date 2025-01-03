<template>
    <div class="relative cursor-pointer group">

        <!-- Video Thumbnail -->
          <img :src="thumbnail || 'https://via.placeholder.com/360x202'" alt="Video Thumbnail"
          class="w-full rounded-lg group-hover:opacity-90"  width="360" height="140"/>

          <!-- Video Details -->
           <div class="flex mt-2">
            <img :src="channelThumbnail" 
            class="rounded-full w-10 h-10 mr-3"
            alt="PFP"/>



            <div class="">
                <h3 class="text-white font-semibold text-sm">{{ title.substring(0,40) || 'No Title' }}</h3>
                <p class="text-gray-400 text-sm">{{ channelTitle || 'Unknown Channel' }}</p>
                <p class="text-gray-400 text-sm">{{ views || '0 views' }}</p>
            </div>
           </div>

    </div>
</template>

<script setup lang="ts">
   import {defineProps} from 'vue';

   defineProps({
       title:{type:String, default:''},
       channelTitle:{type:String, default:''},
       views:{type:String, default:''},
       channelThumbnail:{type:String, default:''},
       thumbnail:{type:String, default:''},
   })
</script>

<style scoped>

</style>