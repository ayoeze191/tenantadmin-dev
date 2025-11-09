<template>
  <main class="w-full flex items-center">
    <auth-hero />
    <main class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
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
            class="auth_header_text mx-auto p-0 text-[#000000] m-0 md:text-4xl font-[500] text-left"
          >
            Enter OTP
          </p>
        </div>

        <a-form class="auth_form mt-[24px]" :model="modelForm" :rules="rules">
          <a-form-item
            name="confirmpassword"
            class="w-full flex flex-col form-labels"
          >
            <a-input-password
              class="input w-full mt-4"
              :type="viewConfirmPassword ? 'text' : 'password'"
              size="large"
            />
          </a-form-item>
          <p
            class="p-0 m-0 text-[#626262] text-[14px] leading-[21px] mb-[24px] mt-[24px]"
          >
            By proceeding you agree to your
            <span class="text-[#020332] underline">Privacy Policy</span> and
            <span class="text-[#020332] underline"> Terms & Conditions</span>
          </p>
          <Button label="submit" @click="handleCreation" size="grow"/>
        </a-form>
      </div>
    </main>
  </main>
</template>

<script>
import { useUserStore } from "@/store";
import AuthHero from "@/components/AuthHero.vue";
import { ResetAdminPassword } from "@/api/auth";
import IconViewPassword from "@/components/icons/iconViewPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
import Button from "@/components/Button/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { checkPasswordStrength } from "@/utils/helper";
import { rule } from "postcss";

export default {
  components: {
    "view-password-icon": IconViewPassword,
    "hide-password-icon": IconHidePassword,
     Button,
    "auth-hero": AuthHero,
  },
};
</script>

<style></style>
