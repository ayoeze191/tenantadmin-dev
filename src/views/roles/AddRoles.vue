<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">Add Roles</p>
        <div class="w-full rounded-xl px-8 py-5 bg-white">
            <section class="flex flex-wrap justify-between w-full">
                <div class="w-full max-w-128">
                    <label for="role" class="input_label">
                        Role
                    </label>
                    <input id="role" name="role" class="input my-4" v-model="newRoleName"  />
                    <ul class="flex flex-col gap-2">
                        <li class="flex gap-2 cursor-pointer" v-for="(permission, i) in selectedPermissions" :key="`${permission.functionId}${i}`" @click="unselectPermission(permission)">
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
                            <p class="text-secondary text-sm font-normal">{{ permission.label }}</p>
                        </li>
                    </ul>
                    
                </div>
                <div class="w-full max-w-90">
                    <p class="text-txt_dark mb-4">Functions</p>
                    <ul class="flex flex-col gap-2">
                        <li class="flex gap-2 cursor-pointer" v-for="(permission, i) in permissionList" :key="`${permission.functionId}${i}`" @click="selectPermission(permission)">
                            <svg class="my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="#1A7D36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="text-secondary text-sm font-normal">{{ permission.label }}</p>
                        </li>
                    </ul>

                </div>
            </section>
            <button class="btn btn_primary mt-16" :class="{'opacity-75': isDisabled}" :disabled="isDisabled" @click="handleCreateRole()">
                Add Role
            </button>
        </div>
    </div>
</template>

<script>
import { CreateRole, FetchPermissions } from '@/api/role';
import IconEdit from '@/components/icons/IconEdit.vue';
import Table from '@/components/Table.vue';
import {useUserStore} from "@/store";
import { handleToast } from '@/utils/helper';

export default {
  components:{
    "table-component": Table,
    "edit-icon": IconEdit
  },
  created(){
    this.handleFetchPermissions();
  },
  data(){
    return {
        newRoleName: '',
        permissionList: [],
        selectedPermissions: [],
        store: useUserStore(),
    }
  },
  computed: {
    isDisabled(){
        if(!this.newRoleName){
            return true;
        }
        if(this.selectPermissions == []){
            return true
        }
        return false
    }
  },
  methods: {
    handleFetchPermissions(){
        FetchPermissions().then(response => {
            if(response.result.responseCode == '00'){
                this.permissionList = response.result.adminUserFunctions.items
            }
        })
    },
    selectPermission(permission){
        const filteredPermissionsList = this.permissionList.filter(item => item.functionId !== permission.functionId);
        this.selectedPermissions = [...this.selectedPermissions,permission];
        this.permissionList = filteredPermissionsList;
    },
    unselectPermission(permission){
        const filteredPermissionsList = this.selectedPermissions.filter(item => item.functionId !== permission.functionId);
        this.permissionList = [...this.permissionList,permission];
        this.selectedPermissions = filteredPermissionsList;
    },
    handleCreateRole(){
        const payload = {
            roleName: this.newRoleName,
            updatedByUserId: this.store.userProfile.id,
            permissions: this.selectedPermissions.map(item => item.functionId),
        }
        CreateRole(payload).then(response => {
            console.log(response,"response");
            if(response.result.responseCode == '00'){
                handleToast('Role created successfully','success')
                this.resetForm();
            }
        })
    },
    resetForm(){
        this.newRoleName = '';
        this.selectedPermissions = [];
        this.handleFetchPermissions();
    },
  }

}
</script>
