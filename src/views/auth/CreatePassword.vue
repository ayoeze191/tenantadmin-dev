<template>
  <main class="py-6 bg-white w-full h-screen overflow-y-scroll">
    <div class="w-4/6 mx-auto py-4">
      <img class="mx-auto w-21 mb-5" src="../../assets/logo.svg" alt="logo" />
      <p class="auth_header_text">Create Password</p>
      <p class="auth_subheader_text">Access your administrative account</p>

      <form class="auth_form">
        <!-- form block  -->
        <section class="w-full flex flex-row justify-between gap-2">
          <label
            for="password"
            class="input_label text-sm sm:text-base md:text-xl"
            >Password</label
          >
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

        <section class="w-full flex flex-row justify-between gap-2">
          <label
            for="password"
            class="input_label text-sm sm:text-base md:text-xl"
            >Confirm Password</label
          >
        </section>

        <div class="input flex mt-4 mb-10 items-center">
          <input
            class="w-full outline-none border-0"
            :type="viewConfirmPassword ? 'text' : 'password'"
            v-model="confirmpassword"
          />
          <view-password-icon
            class="cursor-pointer"
            @click="toggleConfirmPassword"
            v-if="!viewConfirmPassword"
          />
          <hide-password-icon
            v-else
            class="cursor-pointer"
            @click="toggleConfirmPassword"
          />
        </div>

        <button
          class="btn btn_primary"
          :disabled="disabled()"
          @click="handleCreation"
        >
          Submit
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import { useUserStore } from "@/store";
import { ResetAdminPassword } from "@/api/auth";
import IconViewPassword from "@/components/icons/iconViewPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
import Button from "@/components/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      viewPassword: false,
      viewConfirmPassword: false,
      password: "",
      confirmpassword: "",
      store: useUserStore(),
      route: useRoute(),
      router: useRouter(),
    };
  },
  components: {
    "view-password-icon": IconViewPassword,
    "hide-password-icon": IconHidePassword,
    "button-component": Button,
  },
  methods: {
    togglePassword() {
      this.viewPassword = !this.viewPassword;
    },
    toggleConfirmPassword() {
      this.viewConfirmPassword = !this.viewConfirmPassword;
    },
    disabled() {
      if (this.password != this.confirmpassword || this.password.length == 0) {
        return true;
      }
      return false;
    },
    handleCreation(e) {
      e.preventDefault();
      const toast = useToast();
      this.isLoading = true;
      const userId = this.route.params.userId;
      const token = this.route.params.token;
      const payload = {
        newPassword: this.password,
        userId,
        token,
      };
      ResetAdminPassword(payload).then((response) => {
        console.log(response.result);
        this.isLoading = false;
        if (response.result.responseCode == "00") {
          toast.success("Successfully created a password, please login");
          this.router.push("/login");
        }
      });
    },
  },
};
</script>

<style></style>
