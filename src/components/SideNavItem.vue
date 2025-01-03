<template>
  <li :class="[!openSideNav ? 'p-2' : 'flex items-center p-2']"
    class="text-white text-sm font-semibold text-center hover:bg-gray-600 rounded-lg cursor-pointer" @click="navigateToPath">
    <div :class="[!openSideNav ? 'w-full flex justify-center' : '']">
      <component :is="icon" />
    </div>
    <div :class="[!openSideNav ? '' : 'mt-1 ml-4']">
      <span v-if="!openSideNav">
        {{ iconString.substring(0, 4) }}
      </span>
      <span v-else>{{ iconString }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed } from "vue"
import Home from 'vue-material-design-icons/Home.vue';
import FolderPlayOutline from 'vue-material-design-icons/FolderPlayOutline.vue';
import ImageMultiple from 'vue-material-design-icons/ImageMultiple.vue';
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';
import History from 'vue-material-design-icons/History.vue';
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import GamingIcon from 'vue-material-design-icons/Gamepad.vue';
import MusicIcon from 'vue-material-design-icons/Music.vue';
import NewsIcon from 'vue-material-design-icons/Newspaper.vue';
import { useRouter } from "vue-router";

const props = defineProps<{
  openSideNav: boolean,
  iconString: String
}>()

const { openSideNav, iconString } = toRefs(props)
const router=useRouter()
const icon = computed(() => {
  switch (iconString.value) {
    case 'Home':
      return Home
    case 'Subscription':
      return FolderPlayOutline
    case 'Library':
      return ImageMultiple
    case 'Liked':
      return ThumbUpOutline
    case 'History':
      return History
      case 'Watch Later':
      return ClockOutline
      case 'Trending':
      return TrendingUp
      case 'Gaming':
      return GamingIcon
      case 'Music' :
        return MusicIcon
        case 'News':
        return NewsIcon  




    default:
      return null;
  }
})


const navigateToPath=()=>{
  let path ='/'
  switch (iconString.value) {
    case 'Home':
      path="/"
      case 'Trending':
        path="/"
  }

  router.push(path)
}



</script>

<style lang="scss" scoped></style>