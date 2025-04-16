<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <router-link to="/tenants/lease">
            <p class="text-txt_dark flex gap-1 font-medium text-xl cursor-pointer mt-10"> 
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
    
        <section class="list_container mt-4">
            <div class=" flex w-full justify-between border-b border-br1 pb-3 mb-4">
            <p class="font-medium text-base text-secondary mr-0.5"> All Leases </p>

            <status-select
                :label="'Filter By:'"
                :mode="'filter'"
                :filterOptions="filterOptions"
            ></status-select>
            </div>
            <ul>
                <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                    <section class="flex w-full justify-between mb-4">
                    <p class="font-medium text-lg leading-6 text-txt_dark">Steph Orkuma <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>

                    <div class="flex gap-2">
                        
                        <div class="py-1 px-2.5 h-5 my-auto rounded-2xl text-scs bg-scs_bg">
                            <p class="font-medium text-base leading-3">Renewal</p>
                        </div>
                    </div>
                    </section>
                    <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View tenant information</a>
                    
                </li>
                <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                    <section class="flex w-full justify-between mb-4">
                    <p class="font-medium text-lg leading-6 text-txt_dark">Steph Orkuma <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <div class="flex gap-2">
                        
                        <div class="py-1 px-2.5 h-5 my-auto rounded-2xl text-pnd bg-pending">
                            <p class="font-medium text-base leading-3">Sublease</p>
                        </div>
                    </div>
                    </section>
                    <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View tenant information</a>
                    
                </li>
                <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                    <section class="flex w-full justify-between mb-4">
                    <p class="font-medium text-lg leading-6 text-txt_dark">Steph Orkuma <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <div class="flex gap-2">
                        
                        <div class="py-1 px-2.5 h-5 my-auto rounded-2xl text-scs bg-scs_bg">
                            <p class="font-medium text-base leading-3">Renewal</p>
                        </div>
                    </div>  
                    </section>
                    <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View tenant information</a>
                    
                </li>
                <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                    <section class="flex w-full justify-between mb-4">
                    <p class="font-medium text-lg leading-6 text-txt_dark">Steph Orkuma <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>  
                    <div class="flex gap-2">
                        
                        <div class="py-1 px-2.5 h-5 my-auto rounded-2xl text-scs bg-scs_bg">
                            <p class="font-medium text-base leading-3">Renewal</p>
                        </div>
                    </div>  
                    </section>
                    <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View tenant information</a>
                    
                </li>
                <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                    <section class="flex w-full justify-between mb-4">
                    <p class="font-medium text-lg leading-6 text-txt_dark">Steph Orkuma <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                    <div class="flex gap-2">
                        
                        <div class="py-1 px-2.5 h-5 my-auto rounded-2xl text-scs bg-scs_bg">
                            <p class="font-medium text-base leading-3">Renewal</p>
                        </div>
                    </div>
                    </section>
                    <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View tenant information</a>
                    
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>