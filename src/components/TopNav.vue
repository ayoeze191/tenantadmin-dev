<template>
  <nav class="w-full bg-white py-4 px-9.5 flex justify-between box-border">
    <section>
        <select v-if="isCurrentRoute('/dashboard')" class="text-secondary">
            <option class="text-secondary text-xl leading-6">All My Properties</option>
        </select>
        <h1 class="text-txt_dark font-semibold text-4xl leading-[43px]">{{routeName}}</h1>
    </section>
    <div class="relative cursor-pointer">
        <section class="flex gap-6 h-[67px]">
            <img class="w-6 h-6 my-auto" src="../assets/notification.svg" alt="notification bell icon" /> 
            <div class="border-[0.5px] border-br1 h-full" ></div>
            <div class="flex gap-3.5 my-auto" @click="toggleDropdown()">
                <img class="w-16 h-16 rounded-full object-cover" src="https://images.pexels.com/photos/19891768/pexels-photo-19891768/free-photo-of-model-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="profile image" />
                <div>
                    <p class="text-txt_dark font-medium text-base leading-6.5">{{ store.userProfile.firstname }} {{ store.userProfile.lastname }}</p>
                    <p class="text-secondary text-sm leading-6.5">{{store.userProfile.role.name || "N/A"}}</p>
                </div>
            </div>
        </section>
        <ul class="bg-white w-48 z-50 py-3.5 absolute -right-10" v-if="dropdown">
            <li class="py-4 px-2 border-b border-b-br3 font-medium text-secondary cursor-pointer text-base leading-5">Change Password</li>
            <li class="py-4 px-2 cursor-pointer font-medium text-secondary text-base leading-5" >Edit Profile</li>
            <li class="py-4 px-2 cursor-pointer font-medium text-dng text-base leading-5" @click="LogUserOut()">
                <router-link
                    :to="{name: 'login'}"
                >
                Logout
                </router-link>
            </li>
        </ul>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '@/store';

export default {
  components:{

  },
  created(){
  },
  computed: {
    routeName() {
        if(this.$route.path.includes('dashboard')){
            return 'Dashboard'
        } else if(this.$route.path.includes('service-requests')){
            return 'Service Request'
        } else if(this.$route.path.includes('tenants')){
            return 'My Tenants'
        } else if(this.$route.path.includes('applications')){
            return 'Applications'
        } else if(this.$route.path.includes('payments')){
            return 'Payments'
        } else if(this.$route.path.includes('properties')){
            return 'My Properties'
        } else if(this.$route.path.includes('roles')){
            return 'Roles'
        } else if(this.$route.path.includes('users')){
            return 'Users'
        } else return ''
    }
  },
  data(){
    return {
        dropdown: false,
        store: useUserStore()
    }
  },
  methods: {
    isCurrentRoute(route){
        if(!route)return

        if(this.$route.path == route){
            return true;
        }

        return false
    },
    toggleDropdown(){
        this.dropdown = !this.dropdown;
    },
    LogUserOut(){
        this.store.logUserOut();
    }

  }

}
</script>

<style>

</style>