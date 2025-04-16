<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
      <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">View Properties</p>
      <ul class="flex gap-7 px-[26px] py-4">
        <li v-for="property in propertyList" class="w-full max-w-[343px] min-h-[363px] cursor-pointer" :key="property.accommodationId" @click="handleRedirect(property)">
            <img :src="property.images[0].image" class="m-0 p-0 rounded-t-xl w-full object-contain" :alt="property.name + ' ' + property.images[0].imageTitle "/>
            <div class="bg-white w-full border pt-4 px-2 pb-2 text-left flex flex-col gap-2 rounded-b-md">
                <h1 class="text-primary font-semibold text-2xl leading-7">{{property.name}}</h1>
                <div class="flex gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7.33594C6 7.86637 6.21071 8.37508 6.58579 8.75015C6.96086 9.12522 7.46957 9.33594 8 9.33594C8.53043 9.33594 9.03914 9.12522 9.41421 8.75015C9.78929 8.37508 10 7.86637 10 7.33594C10 6.8055 9.78929 6.2968 9.41421 5.92172C9.03914 5.54665 8.53043 5.33594 8 5.33594C7.46957 5.33594 6.96086 5.54665 6.58579 5.92172C6.21071 6.2968 6 6.8055 6 7.33594Z" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.7687 11.1045L8.94006 13.9331C8.69006 14.1829 8.35112 14.3232 7.99773 14.3232C7.64434 14.3232 7.30541 14.1829 7.0554 13.9331L4.22607 11.1045C3.48021 10.3586 2.97229 9.40827 2.76652 8.37371C2.56076 7.33916 2.66639 6.26681 3.07007 5.29229C3.47374 4.31777 4.15733 3.48483 5.03439 2.89881C5.91144 2.31279 6.94258 2 7.9974 2C9.05222 2 10.0834 2.31279 10.9604 2.89881C11.8375 3.48483 12.5211 4.31777 12.9247 5.29229C13.3284 6.26681 13.434 7.33916 13.2283 8.37371C13.0225 9.40827 12.5146 10.3586 11.7687 11.1045Z" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-txt_dark text-sm leading-4">{{property.address}}</p>
                </div>
                <div class="flex gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.66667 14V9.33333L5.33333 6L2 9.33333V14H5.33333M8.66667 14H5.33333M8.66667 14H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2H6.66667C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V6.66667M5.33333 14V11.3333M8.66667 4.66667V4.67333M11.3333 4.66667V4.67333M11.3333 7.33333V7.34M11.3333 10V10.0067" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-txt_dark text-sm leading-4">{{property.units.length}} Units</p>
                </div>
            </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { FetchProperties, FetchUnitTypes } from '@/api/properties';
import IconEdit from '@/components/icons/IconEdit.vue';
import Table from '@/components/Table.vue';
import handleError from '@/utils/handleError';
import { useUserStore } from "@/store";
import { handleToast } from '@/utils/helper';
import dayjs from 'dayjs';

export default {
  components:{
    "table-component": Table,
    "edit-icon": IconEdit
  },
  created(){
    this.handleFetchProperties();
    this.handleFetchUnitTypes();
  },
  data(){
    return {
        propertyList: [],
        store: useUserStore(),
    }
  },
  methods: {
    handleFetchUnitTypes(){
        FetchUnitTypes().then(response => {
            if(response.properties){
                this.propertyList = response.properties.items
            }else handleError(response)
        })

    },
    handleFetchProperties(){
        const query = {
            size: 50,
            page: 1,
            query: ''
        }
        FetchProperties(this.store.userProfile.adminUserID,query).then(response => {
            if(response.responseCode == '00'){
                this.propertyList = response.properties.items
            }else handleError(response)
        })

    },
    formatDate(date){
        return dayjs(date).format('DD MMM,YYYY')
    },
    handleRedirect(property){
        const images = property.images.map(item=>{
            return item.image
        })
        let imageQuery = {}
        images.forEach((element,index) => {
            imageQuery[`image${index+1}`] = element
        });
        this.$router.push({ path: `/properties/${property.accommodationId}`, query: {...property, ...imageQuery, units: property.units.length} })
    }
  }

}
</script>

<style>

</style>