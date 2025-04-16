<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">Landlord</p>
        <!-- Table -->
        <div class="rounded-lg w-full relative">
            <table-component :headers="headers" :data="landlordList">
                <template #column0="{ entity }">
                {{ entity.firstname }} {{ entity.lastname }}
                </template>
                <template #column1="{ entity }">
                {{ entity.emailAddress }}
                </template>
                <template #column2="{ entity }">
                    <div class="status_mini w-20" :class="{'status_overdue': entity.status === 0, 'status_due': entity.status === 1}">
                        {{ entity.status ? 'Active' : 'Inactive' }}
                    </div>
                </template>
                <template #column3="{ entity }">
                {{ formatDate(entity.lastLoginDate) }}
                </template>
                <template #column4="{ entity }">
                    <div class="absolute">
                        <div class="flex gap-20">
                            <div class="flex gap-1 cursor-pointer">
                                <edit-icon class="my-auto"></edit-icon>
                                <p class="text-secondary text-sm">Edit</p>
                            </div>
                            <div class="cursor-pointer w-4" @click="toggleTableDropdown(entity)">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <ul class="bg-white w-48 z-50 py-3.5 absolute -right-10" v-if="tableDropdown == entity">
                            <li class="py-4 px-2 border-b border-b-br3 font-medium text-secondary cursor-pointer text-base leading-5" @click="handleSignUpLandlord(entity)">Sign up as Admin</li>
                            <li class="py-4 px-2 cursor-pointer font-medium text-secondary text-base leading-5" @click="editLandlord(entity)">Edit Email</li>
                        </ul>
                    </div>
                </template>
            </table-component>
        </div>

    </div>
  
</template>

<script>
import { FetchLandlords, SignUpLandlord } from '@/api/auth';
import IconEdit from '@/components/icons/IconEdit.vue';
import Table from '@/components/Table.vue';
import handleError from '@/utils/handleError';
import { handleToast } from '@/utils/helper';
import dayjs from 'dayjs';

export default {
  components:{
    "table-component": Table,
    "edit-icon": IconEdit
  },
  created(){
    this.handleFetchLandlords();
  },
  data(){
    return {
        headers: ['name','email','status','last login', 'action'],
        landlordList: [],
        tableDropdown: '',
    }
  },
  methods: {
    isActive(data){
        if(this.tableDropdown == data){
            return true;
        } else return false
    },
    toggleTableDropdown(data){
        if(this.isActive(data)){
            this.tableDropdown = ''
        } else this.tableDropdown = data
    },
    handleFetchLandlords(){
        const query = {
            size: 50,
            page: 1,
            query: ''
        }
        FetchLandlords(query).then(response => {
            if(response.accountList){
                this.landlordList = response.accountList.items
            }else handleError(response)
        })

    },
    formatDate(date){
        return dayjs(date).format('DD MMM,YYYY')
    },
    editLandlord(item){
        this.$router.push({name: 'edit-users-landlord',query: item})
    },
    handleSignUpLandlord(landlord){
        SignUpLandlord(landlord.accountId).then(response => {
            if(response.result.responseCode == "00"){
                handleToast('Success','success');
                this.toggleTableDropdown('')
            }else handleError(response)
        })
    },
  }

}
</script>

<style>

</style>