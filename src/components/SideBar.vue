<template>
  <div class="w-full max-w-64 pt-6 px-0 pb-4">
    <img class="mx-auto w-12 mb-3.5" src="../assets//logo.svg" alt="logo" />
    <p class="text-br1 font-medium text-sm leading-4 mb-3.5 pl-4">Menu</p>
    <ul class="pl-2 flex flex-col gap-3.5 nav">
        <li 
             class="px-2 py-1.5" :class="{'bg-light_grey': isCurrentRoute('/dashboard') === true,'bg-white': isCurrentRoute('/dashboard') === false}"
        >
            <router-link
                :to="{name: 'admin-dashboard'}"
                class="flex gap-2.5 w-full"
            >
                <overview-icon v-if="isCurrentRoute('/dashboard') === true"/>
                <overview-icon2 v-else/>
                <p class=" leading-5" :class="{'active-nav': isCurrentRoute('/dashboard') === true, 'text-subtle' : isCurrentRoute('/dashboard') === false }">Overview</p>
            </router-link>
        </li>
        <li 
            class="cursor-pointer" :class="{'bg-white': isActive('service requests') === false}"
        >
            <div class="w-full flex justify-between px-2 py-2" :class="{'active_nav': isActive('service requests')}">
                <div class="flex gap-2.5 w-full" @click="toggleDropdown('service requests')">
                    <request-icon2 v-if="isActive('service requests')"/>
                    <request-icon v-else/>
                    <p class=" leading-5" :class="{'font-medium': isActive('service requests') === true, 'text-primary' : isActive('service requests'), 'text-subtle': !isActive('service requests') }">Service Requests</p>
                </div>
                <up-icon v-if="isActive('service requests') === true"/>
                <down-icon v-else/>
            </div>
            <ul class="w-full ease-in-out" v-if="isActive('service requests')">
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/service-requests/pending') === true}">
                    <router-link
                        :to="{name: 'pending-service-requests'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Pending Request</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/service-requests/completed')}">
                    <router-link
                        :to="{name: 'completed-service-requests'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Completed Request</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/service-requests/all') === true}">
                    <router-link
                        :to="{name: 'all-service-requests'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle" >All Request</p>
                    </router-link>
                </li>
            </ul>
        </li>
        <li 
             class="px-2 py-1.5" :class="{'bg-light_grey': isCurrentRoute('/applications') === true,'bg-white': isCurrentRoute('/applications') === false}"
        >
            <router-link
                :to="{name: 'admin-applications'}"
                class="flex gap-2.5 w-full"
            >
                <application-icon2 v-if="isCurrentRoute('/applications') === true"/>
                <application-icon v-else/>
                <p class=" leading-5" :class="{'active-nav': isCurrentRoute('/applications') === true, 'text-subtle' : isCurrentRoute('/applications') === false }">Tenancy Applications</p>
            </router-link>
        </li>
        <li 
            class="cursor-pointer" :class="{'bg-white': isActive('properties') === false}"
        >
            <div class="w-full flex justify-between px-2 py-2"  :class="{'active_nav': isActive('properties')}">
                <div class="flex gap-2.5 w-full" @click="toggleDropdown('properties')">
                    <properties-icon2 v-if="isActive('properties')"/>
                    <properties-icon v-else/>
                    <p class=" leading-5" :class="{'font-medium': isActive('properties') , 'text-primary' : isActive('properties'), 'text-subtle': !isActive('properties') }">My Properties</p>
                </div>
                <up-icon v-if="isActive('properties') === true"/>
                <down-icon v-else/>
            </div>
            <ul class="w-full ease-in-out" v-if="isActive('properties')">
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/properties/add')}">
                    <router-link
                        :to="{name: 'add-admin-properties'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Add Properties</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/properties')}">
                    <router-link
                        :to="{name: 'admin-properties'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">View Properties</p>
                    </router-link>
                </li>
            </ul>
        </li>
        <li 
            class="cursor-pointer" :class="{'bg-white': isActive('tenants') === false}"
        >
            <div class="w-full flex justify-between px-2 py-2" :class="{'active_nav': isActive('tenants')}">
                <div class="flex gap-2.5 w-full" @click="toggleDropdown('tenants')">
                    <tenants-icon2 v-if="isActive('tenants')"/>
                    <tenants-icon v-else/>
                    <p class=" leading-5" :class="{'font-medium': isActive('tenants') , 'text-primary' : isActive('tenants'), 'text-subtle': !isActive('tenants') }">My tenants</p>
                </div>
                <up-icon v-if="isActive('tenants') === true"/>
                <down-icon v-else/>
            </div>
            <ul class="w-full ease-in-out" v-if="isActive('tenants')">
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/tenants')}">
                    <router-link
                        :to="{name: 'admin-tenants'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Tenant Overview</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/tenants/lease')}">
                    <router-link
                        :to="{name: 'admin-tenants-lease'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Lease Management</p>
                    </router-link>
                </li>
            </ul>
        </li>
        <li 
            class="cursor-pointer" :class="{'bg-white': isActive('payments') === false}"
        >
            <div class="w-full flex justify-between px-2 py-2"  :class="{'active_nav': isActive('payments')}">
                <div class="flex gap-2.5 w-full" @click="toggleDropdown('payments')">
                    <payments-icon2 v-if="isActive('payments')"/>
                    <payments-icon v-else/>
                    <p class=" leading-5" :class="{'font-medium': isActive('payments') , 'text-primary' : isActive('payments'), 'text-subtle': !isActive('payments') }">My payments</p>
                </div>
                <up-icon v-if="isActive('payments') === true"/>
                <down-icon v-else/>
            </div>
            <ul class="w-full ease-in-out" v-if="isActive('payments')">
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/payments/due')}">
                    <router-link
                        :to="{name: 'admin-payments-due'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Payment Due</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/payments/rent')}">
                    <router-link
                        :to="{name: 'admin-payments-rent'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Rent Payment</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/payments/utility')}">
                    <router-link
                        :to="{name: 'admin-payments-utility'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Utility</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/payments/deposit')}">
                    <router-link
                        :to="{name: 'admin-payments-deposit'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Security Deposit</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/payments/maintenance')}">
                    <router-link
                        :to="{name: 'admin-payments-maintenance'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Maintenance Fee</p>
                    </router-link>
                </li>
            </ul>
        </li>
        <li 
            class="cursor-pointer" :class="{'bg-white': isActive('users') === false}"
        >
            <div class="w-full flex justify-between px-2 py-2"  :class="{'active_nav': isActive('users')}">
                <div class="flex gap-2.5 w-full" @click="toggleDropdown('users')">
                    <users-icon2 v-if="isActive('users')"/>
                    <users-icon v-else/>
                    <p class=" leading-5" :class="{'font-medium': isActive('users') , 'text-primary' : isActive('users'), 'text-subtle': !isActive('users') }">Users</p>
                </div>
                <up-icon v-if="isActive('users') === true"/>
                <down-icon v-else/>
            </div>
            <ul class="w-full ease-in-out" v-if="isActive('users')">
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/users/landlord')}">
                    <router-link
                        :to="{name: 'admin-users-landlord'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Landlord</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/users/admin')}">
                    <router-link
                        :to="{name: 'admin-users-admin'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Admin</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/users/register')}">
                    <router-link
                        :to="{name: 'admin-users-register'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Register Admin User</p>
                    </router-link>
                </li>
            </ul>
        </li>
        <li 
            class="cursor-pointer" :class="{'bg-white': isActive('roles') === false}"
        >
            <div class="w-full flex justify-between px-2 py-2"  :class="{'active_nav': isActive('roles')}">
                <div class="flex gap-2.5 w-full" @click="toggleDropdown('roles')">
                    <roles-icon2 v-if="isActive('roles')"/>
                    <roles-icon v-else/>
                    <p class=" leading-5" :class="{'font-medium': isActive('roles') , 'text-primary' : isActive('roles'), 'text-subtle': !isActive('roles') }">Roles</p>
                </div>
                <up-icon v-if="isActive('roles') === true"/>
                <down-icon v-else/>
            </div>
            <ul class="w-full ease-in-out" v-if="isActive('roles')">
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/users/roles')}">
                    <router-link
                        :to="{name: 'admin-users-roles'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">View Roles</p>
                    </router-link>
                </li>
                <li class="px-3 py-2 w-full rounded" :class="{'bg-light_grey2': isCurrentRoute('/users/roles/add')}">
                    <router-link
                        :to="{name: 'admin-users-add-roles'}"
                        
                    >
                        <p class="ml-6 leading-5 text-subtle">Add Roles</p>
                    </router-link>
                </li>
            </ul>
        </li>
        <li 
             class="px-2 py-1.5" :class="{'bg-light_grey': isCurrentRoute('/notification') === true,'bg-white': isCurrentRoute('/notification') === false}"
        >
            <router-link
                :to="{name: 'admin-users-notification'}"
                class="flex gap-2.5 w-full"
            >
                <messaging-icon2 v-if="isCurrentRoute('/notification') === true"/>
                <notification-icon v-else/>
                <p class="my-auto leading-5" :class="{'active-nav': isCurrentRoute('/notification') === true, 'text-subtle' : isCurrentRoute('/notification') === false }">User Notification</p>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import IconOverview from './icons/IconOverview.vue';
import IconOverview2 from './icons/IconOverview2.vue';
import IconServiceRequest from './icons/IconServiceRequests.vue';
import IconServiceRequest2 from './icons/IconServiceRequests2.vue';
import IconApplications from './icons/IconApplications.vue';
import IconApplications2 from './icons/IconApplications2.vue';
import IconProperties from './icons/IconProperties.vue';
import IconProperties2 from './icons/IconProperties2.vue';
import IconTenants from './icons/IconTenants.vue';
import IconTenants2 from './icons/IconTenants2.vue';
import IconPayments from './icons/IconPayments.vue';
import IconPayments2 from './icons/IconPayments2.vue';
import IconNotification from './icons/IconNotification.vue';
import IconMessaging2 from './icons/IconNotification2.vue';
import IconTopArrow from './icons/IconTopArrow.vue';
import IconBottomArrow from './icons/IconBottomArrow.vue';
import IconUser from './icons/IconUser.vue';
import IconUsers2 from './icons/IconUsers2.vue';
import IconRoles from './icons/IconRoles.vue';
import IconRoles2 from './icons/IconRoles2.vue';

export default {
    components:{
        "overview-icon": IconOverview,
        "overview-icon2": IconOverview2,
        "tenants-icon": IconTenants,
        "request-icon": IconServiceRequest,
        "request-icon2": IconServiceRequest2,
        "tenants-icon": IconTenants,
        "application-icon": IconApplications,
        "application-icon2": IconApplications2,
        "tenants-icon2": IconTenants2,
        "properties-icon": IconProperties,
        "properties-icon2": IconProperties2,
        "tenants-icon2": IconTenants2,
        "tenants-icon": IconTenants,
        "payments-icon": IconPayments,
        "payments-icon2": IconPayments2,
        "users-icon": IconUser,
        "users-icon2": IconUsers2,
        "roles-icon": IconRoles,
        "roles-icon2": IconRoles2,
        "notification-icon": IconNotification,
        "messaging-icon2": IconMessaging2,
        "up-icon": IconTopArrow,
        "down-icon": IconBottomArrow,
    },
    data(){
        return {
            set: "",
            dropdown: [],
        }
    },
    methods: {
        isActive(key) {
            if(this.dropdown.some(item => item === key)){
                return true;
            } return false;
        },
        isCurrentRoute(route){
            if(!route)return

            if(this.$route.path == route){
                return true;
            }

            return false
        },
        toggleDropdown(key) {
            if(this.dropdown.includes(key)){
                const filteredDropdown = this.dropdown.filter(item => item !== key);
                this.dropdown = filteredDropdown;
            } else {
                const newDropDown = [...this.dropdown,key];
                this.dropdown = newDropDown;
            }
        }
    }
}
</script>

<style>

</style>