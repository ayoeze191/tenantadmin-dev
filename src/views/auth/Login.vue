<template>
  <main class="py-6 bg-white w-full h-screen overflow-y-scroll">
    <div class="w-4/6 mx-auto py-4">
        <img class="mx-auto w-21 mb-16" src="../../assets/logo.svg" alt="logo" />
        <p class="auth_header_text">Login</p>
        <p class="auth_subheader_text">Access your administrative account</p>
        <form class="auth_form" @submit.prevent="handleLogin()">
            <label for="email" class="input_label">
                Email Address
            </label>
            <input id="email" name="email" class="input mt-4 mb-10" v-model="email"  />
            <section class="w-full flex justify-between">
                <label for="password" class="input_label">
                    Password
                </label>
                <a class="text-txt_dark2 text-lg leading-[21.48px]">
                    Forgot password?
                </a>
            </section>
            <div class="input flex mt-4 mb-10">
                <input class="w-full" :type="viewPassword ? 'text' : 'password' " v-model="password"/>
                <view-password-icon class="cursor-pointer" @click="togglePassword" v-if="!viewPassword"/>
                <hide-password-icon v-else class="cursor-pointer" @click="togglePassword" />
            </div>

            <!-- <button class="btn btn_primary" :disabled="isDisabled()">
                Login
            </button> -->
            <button-component label="Login" :loading="isLoading" :disabled="isDisabled()"></button-component>
        </form>
        <p class="text-center mt-7 text-2xl leading-7 text-txt_dark">Don’t have an account?<router-link to="/register"><span class="text-primary font-bold">Create account.</span></router-link></p>
    </div>
  </main>
</template>

<script>
import iconViewPassword from "../../components/icons/iconViewPassword.vue";
import iconHidePassword from "../../components/icons/IconHidePassword.vue";
import { LoginUser } from "@/api/auth";
import Button from "@/components/Button.vue";
import { useToast } from "vue-toast-notification";
import { setCookie } from "@/utils/cookies";
import handleError from "@/utils/handleError";
import { useUserStore } from "@/store";


export default {
    data() {
        return {
            viewPassword: false,
            isLoading: false,
            email: '',
            password: '',
            store: useUserStore(),
        }
    },
    created() {
        
    },
    components: {
        'view-password-icon': iconViewPassword,
        'hide-password-icon': iconHidePassword,
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
        handleLogin() {
            const $toast = useToast({position: 'top-right'});
            this.isLoading = true;
            const payload = {
                email: this.email,
                password: this.password
            };
            LoginUser(payload).then(response => {
                this.isLoading = false;
                if(response.result.responseCode == '00'){
                    this.store.logUserIn(response.result.userProfile)
                    setCookie("10ants-tk", response.result.authToken)
                    this.$router.push({
                        name: 'admin-dashboard',
                    });
                } else {
                    handleError(response);
                }
            })

        }
    }
}
</script>

<style>

</style>