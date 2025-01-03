<template>
   <NavLayout>
    <div v-if="loading" class="w-[90vw] h-[90vh] flex items-center justify-center">
        <img :src="loader" alt="Loading...." sizes="30">
    </div>
    
    <div v-if="!loading && videoData!==null" class="xl:flex  w-full mt-[20px]">
        <div class="p-3 lg:w-[65%] w-full">
            <!-- VideopPlaer -->.
            <iframe
        :src="playLink"
        class="w-full h-[300px] md:h-[400px] lg:h-[560px] xl:h-[500px] 2xl:h-[600px]"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

             <div class="text-white text-2xl font-bold mt-4">
                {{videoData.title}}
             </div>
             <div class="flex items-center mb-4 cursor-pointer mt-2" @click="gotoChannel(videoData.channelId)">
                <img src="https://placehold.co/400" class="rounded-full w-10 h-10" alt="">
                <div class="pl-2 text-white">
                    <div class="text-lg font-bold flex items-center">
                       {{videoData.channelTitle}}
                        <CheckkCircle fillColor="#888888" :size="17" class="ml-2"/>
                    </div>
                    <div class="text-sm text-gray-400">1.4M Subs</div>
                </div>
             </div>

                <div class="bg-[#3f3f3f] rounded-lg w-full p-3 text-white mt-4">
                    <div class="text-white text-lg font-extrabold">{{videoData.viewCount}} - 3 days ago</div>
                    <div class="text-sm font-regular mt-2">
                       {{ videoData.description }}
                    </div>
                </div>

                <!-- COmment section -->

                <div class="mt-6">
                    <div class="text-white text-lg font-extrabold">{{ comments?.commentsCount }} comments</div>

                    <div class="mt-4" v-for="(comment,index) in comments?.data" :key="index">
                        <div class="flex items-start mb-4">
                            <img :src="comment.authorThumbnail[0].url" class="rounded-full w-10 h-10" alt="commenter"/>
                            <div class="pl-4 text-white">
                                <div class="font-bold">
                                   {{ comment.authorText }}
                                    <span class="text-gray-400 text-sm font-regular"> {{comment.publishedTimeText}}</span>
                                </div>
                                <div class="text-gray-300 text-sm mt-1"> {{comment.textDisplay}}</div>
                                <div class="mt-2 flex items-center text-gray-400 text-sm">
                                    <ThumbUpOutline :size="20"  class="pr-2"/>{{ comment.likeCount }}
                                    <ThumbUpDownOutline :size="20"  class="pl-2 pr-2"/> 12
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        </div>



        <div class="w-full lg:w-[35%] xl:flex flex-col gap-3 p-3 mt-[20px]">
           <RecomendationCard
           v-for="(video,index) in RecomData"
              :key="index"
              :title="video.title"
              :channelTitle="video.channelTitle"
                :views="formatNumber(Number(video.viewCount) )"
                :image="video.thumbnail?.[0].url"
                @click="goToVidoe(video.videoId)"
           />
           
        </div>
    </div>
</NavLayout>
</template>

<script setup lang="ts">
import { ref,onMounted, watch } from 'vue';
import NavLayout from '../components/NavLayout.vue';
import loader from '../assets/loader.gif'
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue'
import ThumbUpDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue'
import RecomendationCard from '../components/RecomendationCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { CommentsResponse, HomeVideo, Video } from '../Services/DataService';
import { getComments, getRelatedVideos, getVideoInfo } from '../Services/API';
const loading = ref<Boolean>(true)
const route= useRoute()
const Router = useRouter()
const videoId = ref<string>(route.params.id as string)
console.log(videoId)
const videoData = ref<Video | null>(null)
const RecomData = ref<HomeVideo[]>([])
const comments = ref<CommentsResponse | null> ({data:[], commentsCount:"0"})

const playLink =`https://www.youtube.com/embed/${videoId.value}?autoplay=1`

watch(()=>route.params.id, async (newId) => {
    videoId.value=newId as string
    loading.value = true
    await Promise.all([fetchVideoData(),fetchComments(),getRecomVideos()])
    loading.value= false
})


const fetchVideoData=  async () => {
    videoData.value = await getVideoInfo(videoId.value)
}

const fetchComments = async () => {
    comments.value = await getComments(videoId.value)
}

const getRecomVideos = async () => {
RecomData.value = await getRelatedVideos(videoId.value)
}

const goToVidoe =(id:string) => {
    Router.push({name:"Video",params:{id}})
 
}
const gotoChannel =(id:string) => {
    Router.push({name:"Channel",params:{id}})
 
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


onMounted(async()=>
{
    await Promise.all([fetchVideoData(),fetchComments(),getRecomVideos()])
    loading.value = false
})


</script>

<style lang="scss" scoped>

</style>