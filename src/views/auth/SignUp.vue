<template>
    <main class="py-6 bg-white w-full h-screen overflow-y-scroll">
      <div class="w-4/6 mx-auto py-4 smallTablet:w-5/6">
        <img class="mx-auto w-21 mb-5" src="../../assets/logo.svg" alt="logo" />
        <p class="auth_header_text">Sign Up</p>
        <p class="auth_subheader_text">Access your administrative account</p>

        <form class="auth_form">
            <section class="flex gap-4 phone:flex-col">
            <!-- form block  -->
                <div class="w-full">
                    <label for="firstName" class="input_label">
                        First Name
                    </label>
                    <input id="firstName" name="firstName" class="input mt-4 mb-10"  />
                </div>
            <!-- form block  -->
                <div class="w-full">
                    <label for="lastName" class="input_label">
                        Last Name
                    </label>
                    <input id="lastName" name="lastName" class="input mt-4 mb-10"  />
                </div>
            </section>
            <!-- form block  -->
            <label for="email" class="input_label">
                Email Address
            </label>
            <input id="email" name="email" class="input mt-4 mb-10"  />
            <!-- form block  -->
            <label for="phoneNumber" class="input_label">
                Phone Number
            </label>
            <input id="phoneNumber" name="phoneNumber" class="input mt-4 mb-10"  />
            
            <button class="btn btn_primary">
                Sign Up
            </button>
        </form>
        <p class="text-center mt-7 text-2xl leading-7 text-txt_dark">Already have an account?<router-link to="/register"><span class="text-primary font-bold">Login</span></router-link></p>
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
            emailAddress: '',
            firstname: '',
            lastname: '',
            phoneNumber: '',
            accountType: '',
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
        handleLogin() {
            const $toast = useToast({position: 'top-right'});
            this.isLoading = true;
            const payload = {
                emailAddress: this.email,
                password: this.password
            };
            LoginUser(payload).then(response => {
                this.isLoading = false;
                if(response.account){
                    this.store.logUserIn(response.account)
                    localStorage.setItem("_10at_", response.token);
                    const router = useRouter()
                    router.push("/dashboard")
                    // return navigate("/dashboard");
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