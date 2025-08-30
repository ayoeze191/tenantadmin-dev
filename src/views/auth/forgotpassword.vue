<template>
  <main class="py-6 bg-[#FAFCFF] w-full h-screen overflow-y-scroll font-sf">
    <div class="w-[90%] max-w-[800px] mx-auto py-4">
      <img class="mx-auto w-21 mb-16" src="../../assets/logo.svg" alt="logo" />

      <!-- Responsive Header -->
      <p
        class="auth_header_text text-2xl sm:text-3xl md:text-4xl font-semibold text-center"
      >
        Forgot Password
      </p>

      <!-- Responsive Subheader -->
      <p
        class="auth_subheader_text text-base sm:text-lg md:text-xl text-center text-txt_dark2 mt-2 mb-6"
      >
        Access your administrative account
      </p>

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
          <span class="text-primary font-bold font-sf">Create account.</span>
        </router-link>
      </p>
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
