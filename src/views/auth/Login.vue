<template>
  <main class="w-full flex items-center font-inter">
    <auth-hero />
    <main class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
      <div class="mx-auto h-full">
        <div
          class="flex justify-center flex-col w-fit h-full mx-auto bg-[#FAFCFF]"
        >
          <div>
            <img
              class="mr-auto mb-[24px] p-0 m-0"
              src="../../assets/logo.svg"
              alt="logo"
            />
            <p
              class="mb-[4px] font-redwing mx-auto p-0 text-[#000000] m-0 md:text-[24px] font-[500] text-left"
            >
              Login
            </p>

            <!-- Responsive Subheader Text -->
            <p
              class="text-[#626262] text-[14px] font-regular leading-[100%] mb-[24px]"
            >
              Access your administrative account
            </p>
          </div>

          <!-- Responsive Subheader -->

          <form class="auth_form" @submit.prevent="handleLogin()">
            <label
              for="email"
              class="text-sm text-[#333332] font-inter font-medium leading-[100%] sm:text-base md:text-xl mb-0 mt-0"
              >Email Address</label
            >
            <input
              id="email"
              name="email"
              class="input mt-2 mb-3"
              v-model="email"
            />

            <section class="w-full flex flex-row justify-between gap-2">
              <label
                for="email"
                class="text-sm text-[#333332] font-inter font-medium leading-[100%] sm:text-base md:text-xl mb-0 mt-0"
                >Password</label
              >
            </section>

            <div class="input flex mt-4 items-center">
              <input
                class="w-full outline-none border-0 mt-2 mb-3"
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
            <div class="flex justify-end">
              <router-link
                to="/forgot-password"
                class="text-[#020332] w-fit mt-[16px] text-right sm:text-base leading-snug sm:leading-normal"
              >
                Forgot password?
              </router-link>
            </div>
            <p
              class="p-0 m-0 text-[#626262] text-[14px] leading-[21px] mb-[24px] mt-[24px]"
            >
              By proceeding you agree to your
              <span class="text-[#020332] underline">Privacy Policy</span> and
              <span class="text-[#020332] underline"> Terms & Conditions</span>
            </p>
            <button-component
              class="m-0 mt-[24px] rounded-[100px] text-base sm:text-lg btn_primary"
              label="Continue"
              :loading="isLoading"
              :disabled="isDisabled()"
            />
          </form>

          <!-- Responsive Footer Text -->
          <p
            class="text-center mt-7 text-sm leading-[100%] text-[#626262] font-inter"
          >
            Don’t have an account?
            <router-link to="/register">
              <span class="text-[#020332] font-medium font-sf">Sign Up</span>
            </router-link>
          </p>
        </div>
      </div>
    </main>
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
import AuthHero from "@/components/AuthHero.vue";

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
      if (!this.email || !this.password || this.isLoading) {
        return true;
      }
      return false;
    },
    handleLogin() {
      const $toast = useToast({ position: "top-right" });
      this.isLoading = true;
      const payload = {
        email: this.email,
        password: this.password,
      };
      LoginUser(payload).then((response) => {
        this.isLoading = false;
        if (response.result.responseCode == "00") {
          this.store.logUserIn(response.result.userProfile);
          setCookie("10ants-tk", response.result.authToken);
          this.$router.push({
            name: "admin-dashboard",
          });
        } else {
          handleError(response);
        }
      });
    },
  },
};
</script>

<style></style>
