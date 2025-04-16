<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <section class="flex gap-2.5 mb-6">
            <router-link to="/users/admin">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4802_8374)">
                    <path d="M20 11.5H7.83L13.42 5.91L12 4.5L4 12.5L12 20.5L13.41 19.09L7.83 13.5H20V11.5Z" fill="#808097"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4802_8374">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                </svg>
            </router-link>
            <p class=" font-semibold text-2xl leading-7 text-txt_dark">Edit Admin</p>
        </section>
        <form class="bg-white px-8 pt-5 pb-7 rounded-xl" @submit.prevent="handleEditAdmin()">
            <!-- form block  -->
            <div class="w-full">
                <label for="role" class="input_label">
                    Role
                </label>
                <vue-select id="role" name="role" class=" mt-4 mb-10" v-model="role" :options="rolesData" label="name"  />
            </div>
            <section class="flex gap-4 phone:flex-col">
            <!-- form block  -->
                <div class="w-full">
                    <label for="firstName" class="input_label">
                        First Name
                    </label>
                    <input id="firstName" name="firstName" class="input mt-4 mb-10 cursor-not-allowed" v-model="firstname" disabled  />
                </div>
            <!-- form block  -->
                <div class="w-full">
                    <label for="lastName" class="input_label">
                        Last Name
                    </label>
                    <input id="lastName" name="lastName" class="input mt-4 mb-10 cursor-not-allowed" v-model="lastname" disabled  />
                </div>
            </section>
            <!-- form block  -->
            <label for="email" class="input_label">
                Email Address
            </label>
            <input id="email" name="email" class="input mt-4 mb-10" v-model="email"  />
            
            <button-component label="Update" :disabled="isDisabled()"></button-component>
        </form>
    </div>
</template>

<script>
import { EditAdmin } from '@/api/auth';
import { FetchRoles } from '@/api/role';
import Button from '@/components/Button.vue';
import handleError from '@/utils/handleError';
import { handleToast } from '@/utils/helper';
import vueSelect from 'vue-select';

export default {
    components:{
        'button-component': Button,
        'vue-select': vueSelect

    },
    created() {
        this.handleFetchRoles();
        this.firstname = this.$route.query.firstname || '';
        this.lastname = this.$route.query.lastname || '';
        this.email = this.$route.query.email || '';
        this.adminUserID = this.$route.query.adminUserID || '';
        this.role = JSON.parse(localStorage.getItem('selected_role'));
    },
    data(){
        return {
            firstname: '',
            lastname: '',
            email: '',
            role: '',
            rolesData: [],
            adminUserID: ''
        }
    },
    methods: {
        isDisabled(){
            if(!this.firstname || !this.lastname || !this.email || !this.role){
                return true;
            } else if (this.firstname == this.$route.query.firstname &&
                this.lastname == this.$route.query.lastname && this.email == this.$route.query.email
                && this.role.id == JSON.parse(localStorage.getItem('selected_role')).id
            ){
                return true;
            } return false;
        },
        handleFetchRoles(){
            FetchRoles().then(response => {
                if(response.result.responseCode == '00'){
                    this.rolesData = response.result.roles.items
                }else handleError(response)
            })
        },
        handleEditAdmin(){
            const payload = {
                adminUserID: this.adminUserID,
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                roleId: this.role.id
            }
            EditAdmin(payload).then(response => {
                if(response.result.responseCode == '00'){
                    handleToast('Admin Details Updated Successfully','success')
                    this.$router.go(-1);
                }else handleError(response)
            })

        },

    }
}
</script>

<style>

</style>