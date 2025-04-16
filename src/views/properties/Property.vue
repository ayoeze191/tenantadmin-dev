<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <section class="flex w-full justify-between mt-14 mb-3">
        <router-link to="/properties" class="pt-3">
            <p class="text-txt_dark flex gap-1 text-xl cursor-pointer"> 
                <span class="my-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4621_17743)">
                            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#808097"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_4621_17743">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </span> 
                Back
            </p>
        </router-link>

        <button class="flex gap-3 btn btn_primary font-medium text-base w-[189px] py-2 justify-center rounded">
            <span>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5.5V19.5M5 12.5H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            Add Tenant
        </button>
    </section>
    <div class="bg-white py-[29px] px-6 rounded-lg">
        <section class="flex gap-2 w-full tablet:flex-wrap mb-12">
            <img :src="propertyData.image1" class="rounded-l-lg w-full max-w-[773px] h-[401px] object-cover" :class="{'w-1/2': !propertyData.image3}" />
            <ul v-if="propertyData.image4" class="flex flex-col gap-2 w-[285px]">
                <li>
                    <img :src="propertyData.image2" class="rounded-r-lg w-[282px] h-[128px] object-cover" />
                </li>
                <li>
                    <img :src="propertyData.image3" class="rounded-r-lg w-[282px] h-[128px] object-cover" />
                </li>
                <li>
                    <img :src="propertyData.image4" class="rounded-r-lg w-[282px] h-[128px] object-cover" />
                </li>
            </ul>
            <ul v-else-if="propertyData.image3" class="flex flex-col justify-between w-[285px]">
                <li>
                    <img :src="propertyData.image2" class="rounded-r-lg w-[282px] h-[195px] object-cover" />
                </li>
                <li>
                    <img :src="propertyData.image3" class="rounded-r-lg w-[282px] h-[195px] object-cover" />
                </li>
            </ul>
            <img v-else-if="propertyData.image2" :src="propertyData.image2" class="rounded-l-lg w-full max-w-[773px] h-[401px] object-cover" :class="{'w-1/2': !propertyData.image3}" />
        </section>

        <h1 class="mb-2 text-txt_dark font-medium text-2xl leading-7">{{ propertyData.name }}</h1>
        <div class="flex gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 7.33594C6 7.86637 6.21071 8.37508 6.58579 8.75015C6.96086 9.12522 7.46957 9.33594 8 9.33594C8.53043 9.33594 9.03914 9.12522 9.41421 8.75015C9.78929 8.37508 10 7.86637 10 7.33594C10 6.8055 9.78929 6.2968 9.41421 5.92172C9.03914 5.54665 8.53043 5.33594 8 5.33594C7.46957 5.33594 6.96086 5.54665 6.58579 5.92172C6.21071 6.2968 6 6.8055 6 7.33594Z" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.7687 11.1045L8.94006 13.9331C8.69006 14.1829 8.35112 14.3232 7.99773 14.3232C7.64434 14.3232 7.30541 14.1829 7.0554 13.9331L4.22607 11.1045C3.48021 10.3586 2.97229 9.40827 2.76652 8.37371C2.56076 7.33916 2.66639 6.26681 3.07007 5.29229C3.47374 4.31777 4.15733 3.48483 5.03439 2.89881C5.91144 2.31279 6.94258 2 7.9974 2C9.05222 2 10.0834 2.31279 10.9604 2.89881C11.8375 3.48483 12.5211 4.31777 12.9247 5.29229C13.3284 6.26681 13.434 7.33916 13.2283 8.37371C13.0225 9.40827 12.5146 10.3586 11.7687 11.1045Z" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-secondary text-sm leading-4">{{propertyData.address}}</p>
        </div>
        <div class="flex gap-2 mb-7">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66667 14V9.33333L5.33333 6L2 9.33333V14H5.33333M8.66667 14H5.33333M8.66667 14H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2H6.66667C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V6.66667M5.33333 14V11.3333M8.66667 4.66667V4.67333M11.3333 4.66667V4.67333M11.3333 7.33333V7.34M11.3333 10V10.0067" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-secondary text-sm leading-4">{{propertyData.units}} Units</p>
        </div>

        <h1 class="mb-2 text-txt_dark font-medium leading-5">Description</h1>
        <p class="text-secondary text-sm leading-4 mb-11">{{propertyData.description}}</p>
        
        <h1 class="mb-2 text-txt_dark font-medium leading-5">Units Type</h1>
        <ul>
            <li class="text-secondary list-disc text-sm leading-4 ml-4">{{propertyData.unitType}}</li>
        </ul>

    </div>
  </div>
</template>

<script>
import IconEdit from '@/components/icons/IconEdit.vue';
import Table from '@/components/Table.vue';
import { useUserStore } from "@/store";
import dayjs from 'dayjs';

export default {
  components:{
    "table-component": Table,
    "edit-icon": IconEdit
  },
  created(){
  },
  data(){
    return {
        store: useUserStore(),
        propertyData: this.$route.query
    }
  },
  methods: {
    formatDate(date){
        return dayjs(date).format('DD MMM,YYYY')
    },
    handleRedirect(property){
        this.$router.push({ path: `/properties/${property.accommodationId}`, query: property })
    }
  }

}
</script>

<style>

</style>