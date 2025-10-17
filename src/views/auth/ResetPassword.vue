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
            Reset your password
          </p>
        </div>

        <a-form class="auth_form mt-[24px]" :model="modelForm" :rules="rules">
          <a-form-item name="password" class="w-full flex flex-col form-labels">
            <span class="text-sm md:text-base font-medium text-[#404164]"
              >Reset Your Password</span
            >
            <a-input-password
              :type="viewPassword ? 'text' : 'password'"
              class="input w-full mt-4"
              v-model:value="modelForm.password"
              size="large"
            />
            <!-- <template #prefix>
            <IconLock class="text-gray-400" />
          </template> -->
          </a-form-item>

          <a-form-item
            name="confirmpassword"
            class="w-full flex flex-col form-labels"
          >
            <span class="text-sm md:text-base font-medium text-[#404164]"
              >Confirm Password</span
            >
            <a-input-password
              class="input w-full mt-4"
              :type="viewConfirmPassword ? 'text' : 'password'"
              v-model:value="modelForm.confirmpassword"
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
          <button
            class="btn btn_primary"
            :disabled="disabled()"
            @click="handleCreation"
          >
            Submit
          </button>
        </a-form>
      </div>
    </main>
  </main>
</template>

<script>
import { useUserStore } from "@/store";
import AuthHero from "@/components/AuthHero.vue";
import { ResetPassword } from "@/api/auth";
import IconViewPassword from "@/components/icons/iconViewPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
import Button from "@/components/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { checkPasswordStrength } from "@/utils/helper";
import { rule } from "postcss";

export default {
  data() {
    return {
      viewPassword: false,
      viewConfirmPassword: false,
      modelForm: {
        password: "",
        confirmpassword: "",
      },
      rules: {
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
        ],
        confirmpassword: [
          {
            required: true,
            message: "Please confirm your password",
            trigger: "blur",
          },
          {
            validator: (rule, value) => {
              if (value !== this.modelForm.password) {
                return Promise.reject("Passwords do not match");
              }
              return Promise.resolve();
            },
            trigger: "blur",
          },
        ],
      },
      rules: {
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            validator: (rule, value) => {
              if (!value) return Promise.resolve();

              const { isStrong, message } = checkPasswordStrength(value);
              if (!isStrong) {
                return Promise.reject(message);
              }

              return Promise.resolve();
            },
            trigger: "blur",
          },
        ],
        confirmpassword: [
          {
            required: true,
            message: "Please confirm your password",
            trigger: "blur",
          },
          {
            validator: (rule, value) => {
              if (value !== this.modelForm.password) {
                return Promise.reject("Passwords do not match");
              }
              return Promise.resolve();
            },
            trigger: "blur",
          },
        ],
      },
      store: useUserStore(),
      route: useRoute(),
      router: useRouter(),
    };
  },
  components: {
    "view-password-icon": IconViewPassword,
    "hide-password-icon": IconHidePassword,
    "button-component": Button,
    "auth-hero": AuthHero,
  },
  methods: {
    togglePassword() {
      this.viewPassword = !this.viewPassword;
    },
    toggleConfirmPassword() {
      this.viewConfirmPassword = !this.viewConfirmPassword;
    },
    disabled() {
      if (
        this.modelForm.password != this.modelForm.confirmpassword ||
        this.modelForm.password.length == 0 ||
        checkPasswordStrength(this.modelForm.password).isStrong !== true
      ) {
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
        newPassword: this.modelForm.password,
        userID: userId,
        token,
      };
      ResetPassword(payload).then((response) => {
        this.isLoading = false;
        if (response.responseCode == "00") {
          toast.success("Successfully created a password, please login");
          this.router.push("/login");
        } else {
          toast.error(response.result.responseMessage);
        }
      });
    },
  },
};
</script>

<style></style>
