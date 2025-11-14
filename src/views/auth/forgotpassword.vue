<template>
  <main class="w-full flex items-center">
    <auth-hero />

    <div class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
      <div class="mx-auto h-full">
        <div
          class="flex justify-center flex-col w-fit h-full mx-auto bg-[#FAFCFF] px-4 md:px-0"
        >
          <div class="">
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
          <form
            class="auth_form w-full"
            @submit.prevent="handleForgottenPassword()"
          >
            <a-form-item for="email" name="email">
              <div v-if="step == 0" class="w-full">
                <p
                  class="text-sm md:text-base font-medium m-0 p-0 font-inter text-[#404164]"
                >
                  Email Address
                </p>
                <a-input
                  id="email"
                  class="input mt-2 mb-[24px] w-full"
                  v-model:value="email"
                  :rules="[{ required: true, message: 'Please input Email' }]"
                  name="email"
                />
              </div>

              <div v-if="step == 1" class="flex gap-4 mb-4">
                <a-input
                  v-for="(digit, index) in otp"
                  :key="index"
                  v-model:value="otp[index]"
                  size="large"
                  type="text"
                  maxlength="1"
                  class="w-12 text-center"
                />
              </div>
              <Button label="Continue" :loading="isLoading" size="grow"/>
            </a-form-item>
            <p class="text-center m-0 p-0 text-sm text-txt_dark">
              Don’t have an account?
              <router-link to="/register">
                <span
                  class="text-[#404164] font-medium p-0 m-0 font-sf text-[14px] underline"
                  >Create account.</span
                >
              </router-link>
            </p>
          </form>

          <!-- Responsive Footer Text -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import iconViewPassword from "../../components/icons/iconViewPassword.vue";
import iconHidePassword from "../../components/icons/IconHidePassword.vue";
import { LoginUser } from "@/api/auth";
import Button from "@/components/Button/Button.vue";
import { useToast } from "vue-toast-notification";
import { setCookie } from "@/utils/cookies";
import AuthHero from "@/components/AuthHero.vue";
import { useRouter } from "vue-router";
import handleError from "@/utils/handleError";
import { useUserStore } from "@/store";
import { ForgottenPassword, VerifyOtp } from "@/api/auth";
export default {
  data() {
    return {
      step: 0,
      otp: ["", "", "", "", "", ""],
      viewPassword: false,
      isLoading: false,
      email: "",
      password: "",
      store: useUserStore(),
      router: useRouter(),
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
      if (this.step == 0) {
        ForgottenPassword(payload).then((response) => {
          this.isLoading = false;
          console.log(response);
          if (response.responseCode == "00") {
            toast.success("Please check your mail");
            this.step = 1;
          } else {
            handleError(response);
          }
        });
        // Verify OTP logic here
        return;
      } else {
        const otpCode = this.otp.join("");
        const verifyPayload = {
          emailAddress: this.email,
          otp: otpCode,
        };
        VerifyOtp(verifyPayload).then((response) => {
          this.isLoading = false;
          if (response.responseCode == "00") {
            toast.success("OTP verified successfully");
            this.router.push({
              name: "reset-forgot-password",
              params: { userId: this.email, token: otpCode },
            });
          } else {
            handleError(response);
          }
        });
      }
    },
  },
};
</script>

<style></style>
