<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">Admin</p>
        <!-- Table -->
        <div class="rounded-lg w-full relative">
            <table-component :headers="headers" :data="adminsList">
                <template #column0="{ entity }">
                    <p class="text-txt_dark2 text-sm">{{ entity.firstname }} {{ entity.lastname }}</p>
                </template>
                <template #column1="{ entity }">
                    <p class="text-txt_dark2 text-sm -m-l-3">{{ entity.email }}</p>
                </template>
                <template #column2="{ entity }">
                    <div class="status_mini" :class="{'status_pending': entity.adminUserStatus === 'Pending','status_overdue': entity.adminUserStatus === 'Inactive', 'status_due': entity.adminUserStatus === 'Active'}">
                        {{ entity.adminUserStatus }}
                    </div>
                </template>
                <template #column3="{ entity }">
                    <p class="text-txt_dark2 text-sm">{{ formatDate(entity.lastLoginDate) }}</p>
                </template>
                <template #column4="{ entity }">
                    <div class="status_mini" :class="{'status_overdue': !entity.isVerified, 'status_due': entity.isVerified}">
                        {{ entity.isVerified ? 'Verified' : 'Not Verified' }}
                    </div>
                </template>
                <template #column5="{ entity }">
                    <div class="absolute">
                        <div class="flex gap-20">
                            <div class="flex gap-1 cursor-pointer">
                                <svg class="my-auto" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.83073 8.5C6.83073 8.85362 6.97121 9.19276 7.22125 9.44281C7.4713 9.69286 7.81044 9.83333 8.16406 9.83333C8.51768 9.83333 8.85682 9.69286 9.10687 9.44281C9.35692 9.19276 9.4974 8.85362 9.4974 8.5C9.4974 8.14638 9.35692 7.80724 9.10687 7.55719C8.85682 7.30714 8.51768 7.16667 8.16406 7.16667C7.81044 7.16667 7.4713 7.30714 7.22125 7.55719C6.97121 7.80724 6.83073 8.14638 6.83073 8.5Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14.1641 8.5C12.5641 11.1667 10.5641 12.5 8.16406 12.5C5.76406 12.5 3.76406 11.1667 2.16406 8.5C3.76406 5.83333 5.76406 4.5 8.16406 4.5C10.5641 4.5 12.5641 5.83333 14.1641 8.5Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="text-secondary text-sm">View</p>
                            </div>
                            <div class="cursor-pointer w-4" @click="toggleTableDropdown(entity)">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <ul class="bg-white w-48 z-50 py-3.5 absolute -right-10" v-if="tableDropdown == entity">
                            <li class="py-4 px-2 border-b border-b-br3 font-medium text-secondary cursor-pointer text-base leading-5" @click="updateAdminStatus(entity)">{{entity.adminUserStatus == 'Inactive' ? 'Activate' : 'Deactivate'}} Admin</li>
                            <li class="py-4 px-2 cursor-pointer font-medium text-secondary text-base leading-5" @click="editAdmin(entity)">Edit Admin</li>
                            <li class="py-4 px-2 cursor-pointer font-medium text-dng text-base leading-5" @click="openModal('reset',entity)">Reset Password</li>
                        </ul>
                    </div>
                </template>
            </table-component>
        </div>

    </div>
    <modal-component ref="resetPassword" :plain="true" @close="handleCloseModal('reset')" :style="{'max-w-128': true}">
        <div class="px-8 pt-8 w-[510px] mx-auto">
            <p class="text-txt_dark font-semibold text-center text-2xl mb-9">Reset Password</p>
            <p class="text-secondary font-semibold text-center text-base mb-20">Are you sure you want to reset the password of {{ this.selected_Admin.firstname + ' ' + this.selected_Admin.lastname }}? This action cannot be undone.</p>
            <div class="flex w-full">
                <button class="btn btn_danger" @click="handleReset()">
                    Reset Password
                </button>
                <button class="btn btn_alternate" @click="this.$refs.deleteRoleModal.closeModal()">
                    Cancel
                </button>
            </div>
        </div>
    </modal-component>
  
</template>

<script>
import { FetchAdmins, ResetAdminPassword, UpdateAdminStatus } from '@/api/auth';
import IconEdit from '@/components/icons/IconEdit.vue';
import Modal from '@/components/Modal.vue';
import Table from '@/components/Table.vue';
import handleError from '@/utils/handleError';
import { handleToast } from '@/utils/helper';
import dayjs from 'dayjs';

export default {
  components:{
    "table-component": Table,
    "edit-icon": IconEdit,
    "modal-component": Modal
  },
  created(){
    this.handleFetchAdmins();
  },
  data(){
    return {
        headers: ['name','email','status','last login','verification', 'action'],
        adminsList: [],
        tableDropdown: '',
        selected_Admin: ''
    }
  },
  methods: {
    isActive(data){
        if(this.tableDropdown == data){
            return true;
        } else return false
    },
    openModal(key,request) {
        this.selected_Admin = request;

        if(key == 'reset'){
            this.$refs.resetPassword.openModal();
        }
    },
    handleCloseModal(key) {
        if(key == 'reset'){
            this.$refs.resetPassword.closeModal();
        }
        this.selected_Admin = {};
    },
    toggleTableDropdown(data){
        if(this.isActive(data)){
            this.tableDropdown = ''
        } else this.tableDropdown = data
    },
    handleFetchAdmins(){
        FetchAdmins().then(response => {
            if(response.result.responseCode == '00'){
                this.adminsList = response.result.adminUsers.items
            }else handleError(response)
        })

    },
    formatDate(date){
        return dayjs(date).format('DD MMM,YYYY')
    },
    updateAdminStatus(item){
        const payload = {
            id: item.adminUserID,
            status: item.adminUserStatus == 'Inactive' ? 1 : 0
        }
        UpdateAdminStatus(payload).then(response => {
            if(response.result.responseCode == '00'){
                handleToast('Admin Status Update Successful','success')
                this.handleFetchAdmins();
            }else handleError(response)
        })
    },
    editAdmin(item){
        this.$router.push({name: 'edit-users-admin', query: item })
        localStorage.setItem("selected_role", JSON.stringify(item.role) );
    },
    handleReset(){
        const payload = {
            adminID: this.selected_Admin.adminUserID,
            email: this.selected_Admin.email
        }
        ResetAdminPassword(payload).then(response => {
            if(response.result.responseCode == '00'){
                handleToast('Admin Password Reset Successful','success');
                this.handleCloseModal('reset')
            }else handleError(response)
        })
    }
  }

}
</script>
