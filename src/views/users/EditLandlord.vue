<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
        <section class="flex gap-2.5 mb-6">
            <router-link to="/users/landlord">
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
            <p class=" font-semibold text-2xl leading-7 text-txt_dark">Edit Profile</p>
        </section>
        <form class="bg-white px-8 pt-5 pb-7 rounded-xl" @submit.prevent="handleEditLandlord()">
            <label for="firstname" class="input_label">
                First Name
            </label>
            <input id="firstname" name="firstname" class="input mt-4 mb-7 cursor-not-allowed" v-model="firstname" disabled  />
            <label for="lastname" class="input_label">
                Last Name
            </label>
            <input id="lastname" name="lastname" class="input mt-4 mb-7 cursor-not-allowed" v-model="lastname" disabled  />
            <label for="email" class="input_label">
                Email
            </label>
            <input id="email" name="email" class="input mt-4 mb-7" v-model="email"  />

            <button-component label="Update" :disabled="isDisabled()"></button-component>
        </form>
    </div>
</template>

<script>
import { EditLandlordEmail } from '@/api/auth';
import Button from '@/components/Button.vue';
import handleError from '@/utils/handleError';
import { handleToast } from '@/utils/helper';

export default {
    components:{
        'button-component': Button,

    },
    created() {
        this.firstname = this.$route.query.firstname || '';
        this.lastname = this.$route.query.lastname || '';
        this.email = this.$route.query.emailAddress || '';
    },
    data(){
        return {
            firstname: '',
            lastname: '',
            email: '',
        }
    },
    methods: {
        isDisabled(){
            if(!this.firstname || !this.lastname || !this.email){
                return true;
            } else if (this.firstname == this.$route.query.firstname &&
                this.lastname == this.$route.query.lastname && this.email == this.$route.query.emailAddress
            ){
                return true;
            } return false;
        },
        handleEditLandlord(){
            const payload = {
                landlordId: parseInt(this.$route.query.accountId),
                emailAddress: this.email
            }
            EditLandlordEmail(payload).then(response => {
                if(response.responseCode == '00' ){
                    handleToast('Landlord email update Successful','success')
                    this.$router.go(-1);
                }else handleError(response)
            })

        },

    }
}
</script>

<style>

</style>