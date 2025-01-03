<template>
  <!-- TOP NAVIGATION BAR -->
  <div class="relative top-0">
    <div class="w-[100%] h-[60px] fixed bg-black z-20 flex items-center justify-between" id="TopNav">
      <!-- Left menu & logo -->
      <div class="flex items-center">
        <button class="p-2 ml-3 rounded-full hover:bg-gray-500 cursor-pointer" @click="toggleSideNav">
          <MenuIcon fillColor="#FFFFFF" :size="26" />
        </button>
        <div class="mx-2"></div>
        <div class="flex items-center text-white cursor-pointer" @click="router.push({ name: 'Home' })">
          <img src="/src/assets/YT-logo.png" width="32" alt="">
          <img src="/src/assets/YT-logo-text.png" width="62" alt="">
        </div>
      </div>

      <!-- Middle Search Bar -->
      <div class="w-[600px] hidden md:block">
        <div class="rounded-full flex items-center bg-[#222222]">
          <input type="text"
          v-model="searchText"
            class="form-control w-full text-gray-200 px-5 py-1.5 bg-[#1a1a1a] placeholder-gray-400 rounded-l-full"
            placeholder="Search for videos" />
          <div class="mx-6 cursor-pointer flex items-center" @click="handleSearch">
            <MagnifyIcon fillColor="#FFFFFF" :size="23" />
          </div>
        </div>
      </div>
      <!-- Right profile picture -->
      <div class="">
        <img src="https://placehold.co/400" class="rounded-full mx-8" width="35" alt="Profile" />
      </div>
    </div>

    <!-- Side Navigation bar -->
    <div v-if="!isMobile" class="h-[100%] fixed bg-black z-0 " id="SideNav"
      :class="[!openSideNav ? 'w-[70px]' : 'w-[240px]'], 'hidden sm:block'">
      <ul class="sm:mt-[60px] mt-[30px] w-full " :class="[!openSideNav ? 'p-2' : 'px-5 pb-2 pt-[7px]']">
        <SideNavItem v-for="(item, index) in SideNavItems" :key="index" :openSideNav="openSideNav"
          :iconString="item.iconString" />
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <SideNavItem v-for="(item, index) in SideNavItems2" :key="index" :openSideNav="openSideNav"
          :iconString="item.iconString" />
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <div class="" v-if="openSideNav">

          <div class="text-gray-400 text-[14px] font-extrabold">
            About Press Copyright
            <div class="">Contact us</div>
            Creator Advertise Developers
          </div>
          <div class="border-b border-b-gray-700 my-2.5"></div>
          <div class="text-gray-400 text-[14px] font-extrabold">
            Terms Privacy Policy & Safety
            <div class="How youtube works"></div>
          </div>

        </div>
      </ul>

    </div>

    <!-- Mobile friendly Side Nav -->

    <div v-if="isMobile && openSideNav"
      class="fixed inset-0 z-[99] bg-black w-[240px] top-[60px] h-full transition-transform duration-300">

      <ul class="mt-[20px] w-full px-5 pb-2 pt-[7px]">
        <div class="w-full sm:hidden inline-block">
          <div class="flex items-center rounded-full bg-[#222222] mb-3">
            <input type="text" v-model="searchText"
              class="form-control w-full text0gray-200 px-5 py-1.5 bg-black placeholer-gray-400 rounded-l-full"
              placeholder="Search here....." />
            <div class="mx-6 cursor-pointer flex items-center" @click="handleSearch">
              <MagnifyIcon fillColor="#FFFFFF" :size="23" />
            </div>
          </div>
        </div>
        <SideNavItem v-for="(item, index) in SideNavItems" :key="index" :openSideNav="openSideNav"
          :iconString="item.iconString" />
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <SideNavItem v-for="(item, index) in SideNavItems2" :key="index" :openSideNav="openSideNav"
          :iconString="item.iconString" />
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <div class="text-gray-400 text-[14px] font-extrabold">
          About Press Copyright
          <div class="">Contact us</div>
          Creator Advertise Developers
        </div>
        <div class="border-b border-b-gray-700 my-2.5"></div>
        <div class="text-gray-400 text-[14px] font-extrabold">
          Terms Privacy Policy & Safety
          <div class="How youtube works"></div>
        </div>
      </ul>
    </div>


  </div>



  <div v-if="!isMobile" :style="{
          width: (openSideNav ? 'calc(100% - 240px)' : 'calc(100% - 70px)')
      }" class="h-[calc(100vh-60px)] absolute right-0 top-[35px]">
        <slot></slot>  
      </div>

  <main v-if="isMobile" :style="{
    marginTop: '10px',

    marginLeft: isMobile ? '0' : (openSideNav ? '240px' : '70px')
  }" class="h-[calc(100vh-60px)] absolute right-0 transition-all  duration-300">
    <slot></slot>
  </main>
</template>

<script setup>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import { computed, ref, watch } from 'vue';
import SideNavItem from './SideNavItem.vue';
import { useRoute, useRouter } from 'vue-router';

const openSideNav = ref(true);
const toggleSideNav = () => {
  openSideNav.value = !openSideNav.value;
};

const router = useRouter();
const route = useRoute();

const searchText = ref(route.params.query || '');

// Handle search
const handleSearch = () => {
  const trimmedSearchText = searchText.value.trim();
  if (!trimmedSearchText) return;
  
  // Navigate to Search page with the query parameter
  router.push({ 
    name: 'Search', 
    params: { query: trimmedSearchText } 
  }).catch((err) => {
    if (err.name !== 'NavigationDuplicated') throw err;
  });
};

// Watch for route changes to update searchText

// Check for mobile view
const isMobile = computed(() => window.innerWidth < 640);

// Side navigation items
const SideNavItems = [
  { iconString: 'Home' },
  { iconString: 'Trending' },
  { iconString: 'Gaming' },
  { iconString: 'Music' },
  { iconString: 'News' }
];

const SideNavItems2 = [
  { iconString: 'Subscription' },
  { iconString: 'Library' },
  { iconString: 'Liked' },
  { iconString: 'History' }
];
</script>


<style lang="scss" scoped></style>