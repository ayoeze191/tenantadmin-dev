<template>
    <div class="relative h-6" v-if="mode == 'status'">
        <div class="flex gap-2">
            <p class="text-secondary font-semibold leading-7">{{ label }}</p>
            <div class="status_select" @click="toggleDropdown" :class="{'ss1': selectedState == 'Pending', 'ss2': selectedState == 'Completed','ss3': selectedState == 'Terminate'}">
                <p>{{selectedState}}</p>
                <svg v-if="mode == 'status'" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4249_14653)">
                    <path v-if="selectedState === 'Pending'" d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z" fill="#8E6306"/>
                    <path v-if="selectedState === 'Completed'" d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z" fill="#05603A"/>
                    <path v-if="selectedState === 'Terminate'" d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z" fill="#A00000"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4249_14653">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <ul v-if="isDropdownVisible" class=" absolute -bottom-29 bg-white py-1 w-full z-50 rounded transition-all ease-in" @mouseleave="toggleDropdown">
            <li class="flex gap-2 border-b border-br1.5 p-2 cursor-pointer" @click="handleSelect('Pending')">
                <div 
                    class="w-3 h-3 rounded-full bg-pnd my-auto" 
                >
                </div>
                <p class="text-txt_dark font-medium text-sm leading-4">Pending</p>
            </li>
            <li class="flex gap-2 border-b border-br1.5 p-2 cursor-pointer" @click="handleSelect('Completed')">
                <div 
                    class="w-3 h-3 rounded-full bg-scs my-auto" 
                >
                </div>
                <p class="text-txt_dark font-medium text-sm leading-4">Completed</p>
            </li>
            <li class="flex gap-2 p-2 cursor-pointer" @click="handleSelect('Terminate')">
                <div 
                    class="w-3 h-3 rounded-full bg-dng my-auto" 
                >
                </div>
                <p class="text-txt_dark font-medium text-sm leading-4">Terminate</p>
            </li>
        </ul>

    </div>
    <div v-else class="relative h-6">
        <div class="flex gap-2">
            <p class="text-secondary font-semibold leading-7">{{ label }}</p>
            <div class="status_select bg-bg1" @click="toggleDropdown" :class="{'ss1': selectedState == 'Pending', 'ss2': selectedState == 'Completed','ss3': selectedState == 'Terminate'}">
                <p class="text-txt_dark">{{selectedState}}</p>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4249_14653)">
                    <path d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z" fill="#404164"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4249_14653">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <ul v-if="isDropdownVisible" class=" absolute -bottom-14 bg-white py-1 w-full z-50 rounded transition-all ease-in" @mouseleave="toggleDropdown">
            <li v-for="(option) in filterOptions" :key="option" class="flex gap-2 border-b border-br1.5 p-2 cursor-pointer" @click="handleSelect(option)">
                <p class="text-txt_dark font-medium text-sm leading-4 text-center">{{option}}</p>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    name: "StatusSelect",
    props: {
        onChange: {
            type: Function,
            req: true,
        },
        label: {
            type: String,
            req: true
        },
        mode:{
            type: String,
            default: 'status'
        },
        filterOptions: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            selectedState: this.mode === 'status'? 'Pending' : 'Show All',
            isDropdownVisible: false
        }
    },
    methods: {
        handleSelect(val){
            this.selectedState = val;
            this.isDropdownVisible = false;
        },
        toggleDropdown(){
            this.isDropdownVisible = !this.isDropdownVisible;
        }
    }
}
</script>