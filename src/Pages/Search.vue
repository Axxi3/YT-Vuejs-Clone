<template>
    <NavLayout :prompt="query">
        <div v-if="loading" class="w-[90vw] h-[90vh] flex items-center justify-center mt-[60px]">
            <img :src="loader" alt="Loading...." sizes="30">
        </div>

        <div class="flex flex-col gap-5  mt-[60px]" v-else>
          <SearchResults
          v-for="(video,index) in SearchData"
          :title="video.title"
          :ChannelTitle="video.channelTitle"
          :thumbnail="video.thumbnail?.[0].url"
          :views="formatNumber(Number(video.viewCount)) + ' '+ video.publishedTimeText"
          @click="goToVideo(video.videoId)"
          />

        </div>
    </NavLayout>
</template>

<script setup lang="ts">
import NavLayout from '../components/NavLayout.vue';
import loader from '../assets/loader.gif'
import { onMounted, ref, watch } from 'vue';
import SearchResults from '../components/SearchResults.vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeVideo } from '../Services/DataService';
import { getSearchResults } from '../Services/API';
const loading = ref<Boolean>(false)
const route=useRoute()
const query = ref<string>(route.params.query as string)
const SearchData= ref<HomeVideo[]>([]) 
const router= useRouter()

const fetchSearchResults = async ()=>{
    loading.value=true
    SearchData.value = await getSearchResults(query.value)
    loading.value=false
}

const goToVideo = (videoId:string) => {
   router.push({name:"Video",params : {id:videoId}})
 }

watch(()=>
    route.params.query,async (newQuery)=>{
        loading.value=true
        query.value= newQuery as string
        await Promise.all([fetchSearchResults()])

        loading.value=false
    },
    {immediate:true}
)

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


onMounted(()=>{
    fetchSearchResults()
})
   
</script>

<style lang="scss" scoped>

</style>