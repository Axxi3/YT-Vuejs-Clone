<template>
    <NavLayout prompt="ldsvdsknv">
        <div v-if="ChannelData == null" class="w-[90vw] h-[90vh] flex items-center justify-center">
            <img :src="loader" alt="Loading...." sizes="30">
        </div>

        <div class="flex flex-col w-full mt-[30px]" v-if="ChannelData !== null">
            <div class="h-36 md:h-48 lg:h-60 bg-cover bg-center relative"
                :style= "{backgroundImage: `url(${ChannelData?.meta.banner[0].url})`}">

                <div class="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>


            <!-- Profile Section -->

            <div class="flex flex-row sm:flex-row items-center px--6 pt-6 space-y-4 sm:space-y-0">
                <img :src="ChannelData?.meta.avatar[0].url" alt="Profile"
                    class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-800">


                <div class="sm:ml-6 text-center sm:text-left">
                    <h1 class="text-2xl sm:text-3xl font-semibold text-white">{{ ChannelData.meta.title }}</h1>
                    <p class="text-gray-400 text-sm sm:text-lg"> {{ ChannelData.meta.videosCountText }} videos</p>
                    <a href="#"
                        class="text-white hover:uderline hover:text-blue-500 mt-1 text-sm sm:text-lg ">{{ChannelData.meta.channelHandle}}</a>
                </div>

                <button
                    class="mt-4 mr-4 sm:mt-0 sm:ml-auto bg-red-500 rounded-2xl text-white font-semibold px-4 py-2 sm:px-6 sm:py-3">
                    Subscribe
                </button>
            </div>


            <!-- Latest Video Placeholder -->
            <div class="p-2">
                <h2 class="text-2xl font-semibold mt-8 pl-5 text-white">Latest Video</h2>
                <LatestVideo
                :title="VideoData?.[0]?.title"
                :thumbnail="VideoData?.[0]?.thumbnail[0].url"
                
                :channelName=ChannelData?.meta.title
                
                 
                  />
            </div>


            <!-- Video Card Sectiopn -->

            <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
                <VideoCard
                v-for="(video,index) in VideoData"
                :key="index"
                :title="video.title"
                :thumbnail="video.thumbnail[0].url"
                :channelName="ChannelData?.meta.title"
                :views="formatNumber(Number(video.viewCount))"
                @click="goToVideo(video.videoId)"
                />
            </div>




        </div>
    </NavLayout>
</template>

<script setup lang="ts">
import NavLayout from '../components/NavLayout.vue';
import loader from '../assets/loader.gif'
import { onMounted, ref } from 'vue';
import VideoCard from '../components/VideoCard.vue';
import LatestVideo from '../components/LatestVideo.vue';
import { useRoute, useRouter } from 'vue-router';
import { Channel, HomeVideo } from '../Services/DataService';
import { getchannelInfo } from '../Services/API';

const loading = ref<Boolean>(false)


const router = useRouter()
const route = useRoute()
const chnanelId = ref<string>(route.params.id as string)
const ChannelData = ref<Channel | null>(null)

const VideoData = ref<HomeVideo[] | null>([])
    const fetchChannelVideos = async (): Promise<void> => {
  const data = await getchannelInfo(chnanelId.value);
  if (data) {
    
    ChannelData.value = data
    VideoData.value=data.data[1].data
    console.log(data)
  } else {
    console.error('No channel data found');
  }
  loading.value = false;
};


const goToVideo = (videoId:string) => {
   router.push({name:"Video",params : {id:videoId}})
 }


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

onMounted(fetchChannelVideos)
</script>

<style lang="scss" scoped></style>