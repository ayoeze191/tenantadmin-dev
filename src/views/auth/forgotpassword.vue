<template>
  <main class="w-full flex items-center">
    <auth-hero />

    <div class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
      <div class="mx-auto h-full">
        <div class="flex justify-center flex-col w-fit h-full mx-auto">
          <div>
            <img
              class="mr-auto mb-[24px] p-0 m-0"
              src="../../assets/logo.svg"
              alt="logo"
            />
            <p
              class="auth_header_text mx-auto p-0 text-[#000000] m-0 md:text-4xl font-[500] text-left"
            >
              Forgot Password
            </p>
            <p
              class="text-[#626262] text-[14px] font-regular leading-[100%] mb-[24px]"
            >
              Access your administrative account
            </p>
          </div>

          <form class="auth_form" @submit.prevent="handleForgottenPassword()">
            <a-form-item for="email" name="email">
              <p class="input_label text-sm sm:text-base md:text-xl">
                Email Address
              </p>
              <a-input
                id="email"
                class="input mt-4 mb-10"
                v-model:value="email"
                :rules="[{ required: true, message: 'Please input Email' }]"
                name="email"
              />

              <button-component
                label="Login"
                :loading="isLoading"
                :disabled="isDisabled()"
              />
            </a-form-item>
          </form>

          <!-- Responsive Footer Text -->
          <p
            class="text-center mt-7 text-base sm:text-lg md:text-xl leading-6 text-txt_dark"
          >
            Don’t have an account?
            <router-link to="/register">
              <span class="text-primary font-bold font-sf"
                >Create account.</span
              >
            </router-link>
          </p>
        </div>
      </div>
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
import AuthHero from "@/components/AuthHero.vue";
import handleError from "@/utils/handleError";
import { useUserStore } from "@/store";
import { ForgottenPassword } from "@/api/auth";
export default {
  data() {
    return {
      viewPassword: false,
      isLoading: false,
      email: "",
      password: "",
      store: useUserStore(),
    };
  },
  created() {},
  components: {
    "view-password-icon": iconViewPassword,
    "hide-password-icon": iconHidePassword,
    "button-component": Button,
    "auth-hero": AuthHero,
  },
  methods: {
    togglePassword() {
      this.viewPassword = !this.viewPassword;
    },
    isDisabled() {
      if (!this.email || this.isLoading) {
        return true;
      }
      return false;
    },
    handleForgottenPassword() {
      const toast = useToast({ position: "top-right" });
      this.isLoading = true;
      const payload = {
        email: this.email,
      };
      ForgottenPassword(payload).then((response) => {
        this.isLoading = false;
        if (response.result.responseCode == "00") {
          toast.success("Please check your mail");
          this.email = "";
        } else {
          handleError(response);
        }
      });
    },
  },
};
</script>

<style></style>
