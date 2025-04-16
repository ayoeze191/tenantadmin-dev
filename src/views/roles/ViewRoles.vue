<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">Roles</p>
        <!-- Table -->
        <div class="rounded-lg w-full relative">
            <table-component :headers="headers" :data="rolesData">
                <template #column0="{ entity }">
                {{ entity.name }}
                </template>
                <template #column1="{ entity }">
                    {{ entity.permissions.length || "N/A" }}
                </template>
                <template #column2="{ entity }">
                    {{ formatDate(entity.dateCreate) || "N/A" }}
                </template>
                <template #column3="{ entity }">
                {{ entity.createdBy || "N/A" }}
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
                        <ul class="bg-white w-48 z-50 py-3.5 absolute -right-5" v-if="tableDropdown == entity">
                            <li class="py-4 px-2 border-b border-b-br3 font-medium text-secondary cursor-pointer text-base leading-5 flex gap-2.5" @click="openModal('edit',entity),filterPermissions(entity)">
                                <svg class="my-auto" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.66406 5.16667H3.9974C3.64377 5.16667 3.30464 5.30714 3.05459 5.55719C2.80454 5.80724 2.66406 6.14638 2.66406 6.5V12.5C2.66406 12.8536 2.80454 13.1928 3.05459 13.4428C3.30464 13.6929 3.64377 13.8333 3.9974 13.8333H9.9974C10.351 13.8333 10.6902 13.6929 10.9402 13.4428C11.1903 13.1928 11.3307 12.8536 11.3307 12.5V11.8333M10.6641 3.83333L12.6641 5.83333M13.5874 4.89007C13.85 4.62751 13.9975 4.27139 13.9975 3.90007C13.9975 3.52875 13.85 3.17264 13.5874 2.91007C13.3248 2.64751 12.9687 2.5 12.5974 2.5C12.2261 2.5 11.87 2.64751 11.6074 2.91007L5.9974 8.50007V10.5001H7.9974L13.5874 4.89007Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Edit Role
                            </li>
                            <li class="py-4 px-2 border-b border-b-br3 cursor-pointer font-medium text-secondary text-base leading-5 flex gap-2.5" @click="openModal('view',entity)">
                                <svg class="my-auto" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66667 8.5C6.66667 8.85362 6.80714 9.19276 7.05719 9.44281C7.30724 9.69286 7.64638 9.83333 8 9.83333C8.35362 9.83333 8.69276 9.69286 8.94281 9.44281C9.19286 9.19276 9.33333 8.85362 9.33333 8.5C9.33333 8.14638 9.19286 7.80724 8.94281 7.55719C8.69276 7.30714 8.35362 7.16667 8 7.16667C7.64638 7.16667 7.30724 7.30714 7.05719 7.55719C6.80714 7.80724 6.66667 8.14638 6.66667 8.5Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14 8.5C12.4 11.1667 10.4 12.5 8 12.5C5.6 12.5 3.6 11.1667 2 8.5C3.6 5.83333 5.6 4.5 8 4.5C10.4 4.5 12.4 5.83333 14 8.5Z" stroke="#808097" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                View Permissions
                            </li>
                            <li class="py-4 px-2 cursor-pointer font-medium text-overdue text-base leading-5 flex gap-2.5" @click="openModal('delete',entity)">
                                <svg class="my-auto" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.66406 5.16667H13.3307M6.66406 7.83333V11.8333M9.33073 7.83333V11.8333M3.33073 5.16667L3.9974 13.1667C3.9974 13.5203 4.13787 13.8594 4.38792 14.1095C4.63797 14.3595 4.97711 14.5 5.33073 14.5H10.6641C11.0177 14.5 11.3568 14.3595 11.6069 14.1095C11.8569 13.8594 11.9974 13.5203 11.9974 13.1667L12.6641 5.16667M5.9974 5.16667V3.16667C5.9974 2.98986 6.06763 2.82029 6.19266 2.69526C6.31768 2.57024 6.48725 2.5 6.66406 2.5H9.33073C9.50754 2.5 9.67711 2.57024 9.80213 2.69526C9.92716 2.82029 9.9974 2.98986 9.9974 3.16667V5.16667" stroke="#E41919" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Delete Role
                            </li>
                        </ul>
                    </div>
                </template>
            </table-component>
        </div>

    </div>
    <modal-component ref="viewRoleModal" title="View Role" @close="handleCloseModal('view')" :style="{'max-w-128': true}" >
        <div class="w-full">
            <section class="text-left mb-7">
                <p class="text-secondary text-sm leading-4 mb-1">Role</p>
                <p class="text-txt_dark font-medium">{{ this.selected_Request.name }}</p>
            </section>
            <p class="text-secondary text-sm leading-4 mb-1">Permissions</p>
            <ul class="w-full flex flex-wrap gap-2">
                <li class="bg-neutral rounded px-2 py-1.5" v-for="permission in selected_Request.permissions" :key="`${permission.function.functionId}${i}`">
                    {{ permission.function.name }}
                </li>
            </ul>
        </div>
    </modal-component>
    <modal-component ref="editRoleModal" title="Edit Role" @close="handleCloseModal('edit')" @submit="handleEditRole()" :style="{'max-w-128': true}" button_label="Save Changes" >
        <div class="w-full rounded-xl px-8 py-5 bg-white">
            <div class="w-full">
                <label for="role" class="input_label">
                    Role
                </label>
                <input id="role" name="role" class="input my-4" v-model="selected_Request.name"  />
            </div>
            <p class="input_label mb-4">Permission</p>
            <section class="flex flex-wrap justify-between w-full">
                <ul class="flex flex-col gap-2 w-full max-w-56">
                    <li class="flex gap-2 cursor-pointer" v-for="(permission, i) in selected_Request.permissions" :key="`${permission.functionId}${i}`" @click="unselectPermission(permission)">
                        <svg class="my-auto" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4783_54517)">
                            <path d="M5 12.4219H19" stroke="#E41919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_4783_54517">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.421875)"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <p class="text-secondary text-sm font-normal">{{ permission.function.name }}</p>
                    </li>
                </ul>
                <div class="w-full max-w-56">
                    <ul class="flex flex-col gap-2">
                        <li class="flex gap-2 cursor-pointer" v-for="(permision, i) in permissionList" :key="`${permision.functionId}${i}`" @click="selectPermission(permision)">
                            <svg class="my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="#1A7D36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="text-secondary text-sm font-normal">{{ permision.name }}</p>
                        </li>
                    </ul>

                </div>
            </section>
        </div>
    </modal-component>
    <modal-component ref="deleteRoleModal" :plain="true" @close="handleCloseModal('delete')" :style="{'max-w-128': true}">
        <div class="px-8 pt-8 w-[510px] mx-auto">
            <p class="text-txt_dark font-semibold text-center text-2xl mb-9">Delete Role</p>
            <p class="text-secondary font-semibold text-center text-base mb-20">Deleting this role will remove all associated permissions and access rights. This action cannot be undone.</p>
            <div class="flex w-full">
                <button class="btn btn_danger" @click="handleDeleteRole()">
                    Delete Role
                </button>
                <button class="btn btn_alternate" @click="this.$refs.deleteRoleModal.closeModal()">
                    Cancel
                </button>
            </div>
        </div>
    </modal-component>
    
</template>

<script>
import { DeleteRole, EditRole, FetchPermissions, FetchRoles } from '@/api/role';
import IconEdit from '@/components/icons/IconEdit.vue';
import Modal from '@/components/Modal.vue';
import Table from '@/components/Table.vue';
import dayjs from 'dayjs';
import {useUserStore} from "@/store";
import { handleToast } from '@/utils/helper';
import handleError from '@/utils/handleError';

export default {
  components:{
    "table-component": Table,
    "edit-icon": IconEdit,
    "modal-component": Modal
  },
  created(){
    this.handleFetchRoles();
    this.handleFetchPermissions();
  },
  computed: {},
  data(){
    return {
        headers: ['role','permission','date created','created by', 'action'],
        rolesData: [],
        tableDropdown: '',
        selected_Request: {},
        isDisabled: false,
        permissionList: [],
        store: useUserStore()
    }
  },
  watch: {
    // watching top-level property
    selected_Request(val, oldVal) {
        // skip first instance
        if (oldVal == {}){
            return
        };
        this.isDisabled = false;
    },
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
    handleFetchPermissions(){
        FetchPermissions().then(response => {
            if(response.result.responseCode == '00'){
                this.permissionList = response.result.adminUserFunctions.items
            }else handleError(response)
        })
    },
    handleFetchRoles(){
        FetchRoles().then(response => {
            if(response.result.responseCode == '00'){
                this.rolesData = response.result.roles.items
            }else handleError(response)
        })
    },
    handleEditRole(){
        const payload = {
            roleId: this.selected_Request.roleId,
            roleName: this.selected_Request.name,
            updatedByUserId: this.store.userProfile.id,
            permissions: this.selected_Request.permissions.map(item => item.function.functionId)
        }
        EditRole(payload).then(response => {
            if(response.result.responseCode == '00'){
                handleToast('Role updated successfully','success')
                this.$refs.editRoleModal.closeModal();
                this.handleFetchRoles();
                this.handleFetchPermissions();
            }else handleError(response)
        })
    },
    handleDeleteRole(){
        const id = this.selected_Request.roleId;
        DeleteRole(id).then(response => {
            if(response.result.responseCode == '00'){
                handleToast('Role deleted successfully','success')
                this.$refs.deleteRoleModal.closeModal();
                this.handleFetchRoles();
            }else handleError(response)
        })
    },
    openModal(key,request) {
        this.selected_Request = request;

        if(key == 'view'){
            this.$refs.viewRoleModal.openModal();
        }else if(key == 'edit'){
            this.isDisabled = true;
            this.$refs.editRoleModal.openModal();
        } else {
            this.$refs.deleteRoleModal.openModal();
        }
    },
    formatDate(date){
        return dayjs(date).format('DD MMM,YYYY')
    },
    selectPermission(permission){
        const filteredPermissionsList = this.permissionList.filter(item => item.functionId !== permission.functionId);
        this.selected_Request.permissions = [...this.selected_Request.permissions,{function: permission}];
        this.permissionList = filteredPermissionsList;
    },
    unselectPermission(permission){
        const filteredPermissionsList = this.selected_Request.permissions.filter(item => item.function.functionId !== permission.function.functionId);
        this.permissionList = [...this.permissionList,permission.function];
        this.selected_Request.permissions = filteredPermissionsList;
    },
    filterPermissions(entity){
        const isDuplicated = (key) => {
            if(entity.permissions.some(item => item.function.functionId == key)){
                return true;
            }
            return false
        }
        const filteredPermissionsList = this.permissionList.filter(item => isDuplicated(item.functionId) == false);
        this.permissionList = filteredPermissionsList
    },
    handleCloseModal(key) {
        if(key == 'view'){
            this.$refs.viewRoleModal.closeModal();
        }else if(key == 'edit'){
            this.isDisabled = true;
            this.$refs.editRoleModal.closeModal();
        } else {
            this.$refs.deleteRoleModal.closeModal();
        }
        this.selected_Request = {};
    }
  }

}
</script>