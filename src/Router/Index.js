import { createRouter, createWebHistory } from "vue-router";
import Home from "../Pages/Home.vue";

import VideoDetails from "../Pages/VideoDetails.vue";
import ChannelHome from "../Pages/ChannelHome.vue";
import Search from "../Pages/Search.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component : Home
    } ,
   
    {
        path:"/:id",
        name:"Video",
        component:VideoDetails
    },
    {
        path:'/channel/:id',
        name:'Channel',
        component:ChannelHome
    },
    {
        path:'/search/:query',
        name:'Search',
        component: Search,
        props: true
    },

]


const router = createRouter({
    history:createWebHistory('/'),
    routes
})

export default router