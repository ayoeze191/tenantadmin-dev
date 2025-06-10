<template>
  <main class="py-6 bg-white w-full h-screen overflow-y-scroll">
    <div class="w-4/6 mx-auto py-4 smallTablet:w-5/6">
      <img class="mx-auto w-21 mb-5" src="../../assets/logo.svg" alt="logo" />

      <!-- Responsive Header Text -->
      <p class="auth_header_text text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
        Sign Up
      </p>

      <!-- Responsive Subheader Text -->
      <p class="auth_subheader_text text-base sm:text-lg md:text-xl text-center text-txt_dark2 mt-2 mb-6">
        Access your administrative account
      </p>

      <form class="auth_form">
        <section class="flex gap-4 phone:flex-col">
          <!-- Form block -->
          <div class="w-full">
            <label for="firstName" class="input_label text-sm sm:text-base md:text-xl" >
              First Name
            </label>
            <input id="firstName" name="firstName" class="input mt-4 mb-10" v-model="firstname"/>
          </div>

          <!-- Form block -->
          <div class="w-full">
            <label for="lastName" class="input_label text-sm sm:text-base md:text-xl">
              Last Name
            </label>
            <input id="lastName" name="lastName" class="input mt-4 mb-10" v-model="lastname"/>
          </div>
        </section>

        <!-- Form block -->
        <label for="email" class="input_label text-sm sm:text-base md:text-xl">
          Email Address
        </label>
        <input id="email" name="email" class="input mt-4 mb-10" v-model="email"/>

        <!-- Form block -->
        <label for="phoneNumber" class="input_label text-sm sm:text-base md:text-xl">
          Phone Number
        </label>
        <input id="phoneNumber" name="phoneNumber" class="input mt-4 mb-10"  v-model="phoneNumber"/>

          <section class="w-full flex flex-row justify-between gap-2">
          <label for="password" class="input_label text-sm sm:text-base md:text-xl">Password</label>
        </section>

        <div class="input flex mt-4 mb-10 items-center">
          <input
            class="w-full outline-none border-0"
            :type="viewPassword ? 'text' : 'password'"
            v-model="password"
          />
          <view-password-icon
            class="cursor-pointer"
            @click="togglePassword"
            v-if="!viewPassword"
          />
          <hide-password-icon
            v-else
            class="cursor-pointer"
            @click="togglePassword"
          />
        </div>

        <button class="btn btn_primary text-base sm:text-lg" :disabled="isDisabled()">
          Sign Up
        </button>

      
      </form>

      <!-- Responsive Footer Text -->
      <p class="text-center mt-7 text-base sm:text-lg md:text-xl leading-6 text-txt_dark">
        Already have an account?
        <router-link to="/login">
          <span class="text-primary font-bold">Login</span>
        </router-link>
      </p>
    </div>
  </main>
</template>

<script>
import { AddAdminUser } from "@/api/auth";
import { useUserStore } from "@/store";
import Button from "@/components/Button.vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from 'vue-router'
import IconViewPassword from "@/components/icons/iconViewPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";


export default {
    data() {
        return {
            viewPassword: false,
            isLoading: false,
            email: '',
            firstname: '',
            lastname: '',
            phoneNumber: '',
            accountType: '',
            password: "",
            store: useUserStore()
        }
    },
    created() {
        
    },
    components: {
        'view-password-icon': IconViewPassword,
        'hide-password-icon': IconHidePassword,
        'button-component': Button
    },
    methods: {
        togglePassword() {
            this.viewPassword = !this.viewPassword;
        },
        isDisabled(){
            if(!this.email || !this.password || this.isLoading ){
                return true
            }
            return false
        },
        handleSignup() {
            const $toast = useToast({position: 'top-right'});
            this.isLoading = true;
            const payload = {
                ...this
            };
            LoginUser(payload).then(response => {
                this.isLoading = false;
                if(response.account){
                    this.store.logUserIn(response.account)
                    localStorage.setItem("_10at_", response.token);
                    const router = useRouter()
                    router.push("/dashboard")
                } else {
                    $toast.error(response.responseDescription)
                }
            })

        }
    }
}
</script>

<style>

</style>