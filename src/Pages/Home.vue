<template>
   <NavLayout :prompt="'Search for videosss'">
    <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4 mt-[60px]">
       
      <VideoCard
      v-for="(video,index) in videoDataa"
      :key="video.videoId"
      :title="video.title"
      :thumbnail="video.thumbnail?.[0].url"
      :channelTitle="video.channelTitle"
      :views="`${formatNumber(Number(video.viewCount))}  ${video.publishedTimeText}`"
      :channelThumbnail="video.channelThumbnail?.[0].url"
      @click="goToVideo(video.videoId)"
      />

    </div>
   </NavLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NavLayout from '../components/NavLayout.vue';
import VideoCard from '../components/VideoCard.vue';
import { getHomeVideos } from '../Services/API';
import { HomeVideo } from '../Services/DataService';
import { useRouter } from 'vue-router';
const loadig = ref<Boolean>(true)
const error = ref<string | null>(null)
const videoDataa= ref<HomeVideo[]>([])
 const videoMockData = [
   {
      title: 'Build a Youtube Clone with Vue 3',
      thumbnail:'https://placehold.co/600x400',
      channelThumbail:'https://placehold.co/400',
      channelTitle:'Web Dev Simplified',
      views:'1.5M views',

   },
   {
      title: 'Build a Youtube Clone with Vue 3',
      thumbnail:'https://placehold.co/600x400',
      channelThumbail:'https://placehold.co/400',
      channelTitle:'Web Dev Simplified',
      views:'1.5M views',
      
   }
   , {
      title: 'Build a Youtube Clone with Vue 3',
      thumbnail:'https://placehold.co/600x400',
      channelThumbail:'https://placehold.co/400',
      channelTitle:'Web Dev Simplified',
      views:'1.5M views',
      
   }
 ]
 const router = useRouter()


 
 const formatNumber = (value : number) => {
    if(value !== null) {
        if (value >= 1000000){
            return (value / 1000000).toFixed(1) + 'M';
        }
        else if (value >= 1000){
            return (value / 1000).toFixed(1) + 'K';
        }
        else {
            return value.toString();
        }
    } 
    else {
        return '235k'
    }
}


 const fetchHomeVideos = async () => {
   try {
      loadig.value=true
      const data = await getHomeVideos()
      videoDataa.value= data
      console.log(data)
   } catch (error) {
      error.value='Failed to fetch data'
      console.log(error)
   } finally{
      loadig.value=false
    }
 }

 const goToVideo = (videoId:string) => {
   router.push({name:"Video",params : {id:videoId}})
 }

 onMounted(fetchHomeVideos)

    
</script>

<style lang="scss" scoped>

</style>

