<template>
  <main class="w-full flex items-center font-inter">
    <auth-hero />
    <main class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
      <div class="mx-auto h-full">
        <div
          class="flex justify-center flex-col w-fit h-full mx-auto bg-[#FAFCFF] px-4 md:px-0"
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
              class="text-sm md:text-base font-medium font-inter text-[#404164]"
              >Email Address</label
            >
            <input
              id="email"
              name="email"
              class="input w-full mt-2"
              v-model="email"
            />

            <section
              class="w-full flex flex-row justify-between gap-2 mt-[12px]"
            >
              <label
                for="email"
                class="text-sm md:text-base font-medium font-inter text-[#404164]"
                >Password</label
              >
            </section>

            <div class="input flex mt-4 items-center">
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
            <div class="flex justify-end">
              <router-link
                to="/forgot-password"
                class="text-[#020332] w-fit mt-[16px] text-right text-sm leading-[100%] sm:leading-normal"
              >
                Forgot password?
              </router-link>
            </div>
            <p
              class="p-0 m-0 text-[#626262] text-[14px] leading-[21px] mb-[24px] mt-[24px]"
            >
              By proceeding you agree to your
              <router-link
                to="/privacy-policy"
                class="text-[#020332] underline cursor-pointer"
                >Privacy Policy</router-link
              >
              and
              <router-link
                to="/terms-of-service"
                class="text-[#020332] underline cursor-pointer"
              >
                Terms & Conditions</router-link
              >
            </p>
            <Button
              class="m-0 mt-[24px] text-base sm:text-lg"
              label="Continue"
              :loading="isLoading"
              :disabled="isDisabled()"
              size="grow"
            />
          </form>

          <!-- Responsive Footer Text -->
          <p class="text-center mt-[23px] p-0 text-sm leading-6 text-txt_dark">
            Don’t have an account?
            <router-link to="/register">
              <span
                class="text-[#404164] font-medium font-sf text-[14px] underline"
                >Sign Up</span
              >
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
import Button from "@/components/Button/Button.vue";
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
    Button,
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
