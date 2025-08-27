<template>
  <main class="py-6 bg-[#FAFCFF] w-full h-screen overflow-y-scroll">
    <div class="w-4/6 mx-auto py-4 smallTablet:w-5/6">
      <img
        class="mx-auto w-21 mb-[46px]"
        src="../../assets/logo.svg"
        alt="logo"
      />

      <!-- Responsive Header Text -->
      <p
        class="auth_header_text text-2xl sm:text-3xl text-[#404164] md:text-4xl font-semibold text-center"
      >
        Sign Up
      </p>

      <!-- Responsive Subheader Text -->
      <p
        class="auth_subheader_text text-base sm:text-lg md:text-xl lg:text-[24px] text-center text-[#404164] mt-2 mb-6"
      >
        Access your administrative account
      </p>

      <a-form class="auth_form bg-[#FFFFFF]" :rules="rule" :model="modelForm">
        <div>
          <section class="flex gap-4 phone:flex-col">
            <a-form-item
              name="firstname"
              class="w-full flex flex-col form-labels"
            >
              <span class="text-sm md:text-base font-medium text-[#404164]"
                >First Name</span
              >
              <a-input
                class="input w-full mt-4"
                v-model:value="modelForm.firstname"
                size="large"
              />
            </a-form-item>
            <a-form-item
              name="lastname"
              class="w-full flex flex-col form-labels"
            >
              <span class="text-sm mb-4 md:text-base font-medium text-[#404164]"
                >Last Name</span
              >
              <a-input
                class="input w-full mt-4"
                v-model:value="modelForm.lastname"
                size="large"
              />
            </a-form-item>
          </section>

          <a-form-item
            name="emailAddress"
            class="w-full form-labels flex flex-col"
          >
            <span class="text-sm md:text-base font-medium text-[#404164]"
              >Email Address</span
            >
            <a-input
              class="input w-full mt-4"
              v-model:value="modelForm.emailAddress"
              size="large"
              type="email"
            />
          </a-form-item>

          <a-form-item
            name="phoneNumber"
            class="w-full flex flex-col form-labels"
          >
            <span class="text-sm md:text-base font-medium text-[#404164]"
              >Phone Number</span
            >
            <a-input
              class="input w-full mt-4"
              v-model:value="modelForm.phoneNumber"
              size="large"
              type="number"
            />
          </a-form-item>
        </div>

        <button
          class="btn btn_primary text-base sm:text-lg"
          @click="handleSubmit"
          :disabled="isDisabled()"
        >
          Sign Up
        </button>
      </a-form>

      <!-- :disabled="isDisabled()" -->
      <!-- Responsive Footer Text -->
      <p
        class="text-center mt-7 text-base sm:text-lg md:text-xl leading-6 text-txt_dark"
      >
        Already have an account?
        <router-link to="/login">
          <span class="text-[#404164] font-bold font-sf">Login</span>
        </router-link>
      </p>
    </div>
  </main>
</template>

<script>
// import { AddAdminUser } from "@/api/auth";
import { CreateUser } from "@/api/auth";
import { useUserStore } from "@/store";
import Button from "@/components/Button.vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import IconViewPassword from "@/components/icons/iconViewPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
export default {
  data() {
    return {
      viewPassword: false,
      viewConfirmPassword: false,
      router: useRouter(),
      isLoading: false,
      modelForm: {
        emailAddress: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
      },
      accountType: "",
      password: "",
      confirmpassword: "",
      store: useUserStore(),
      rule: {
        firstname: [{ required: true, message: "First Name is Required" }],
        lastname: [{ required: true, message: "Last Name is Required" }],
        phoneNumber: [
          { required: true, message: "Phone Number is Required" },
          { pattern: /^\d{7,15}$/, message: "Invalid phone number" },
        ],
        emailAddress: [
          { required: true, message: "Email is Required" },
          { type: "email", message: "Invalid email" },
        ],
      },
    };
  },
  created() {},
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
    isDisabled() {
      const { emailAddress, firstname, lastname, phoneNumber } = this.modelForm;

      return (
        !emailAddress?.trim() ||
        !firstname?.trim() ||
        !lastname?.trim() ||
        !phoneNumber?.trim() ||
        !/^\d{7,15}$/.test(phoneNumber) // optional: validate phone format
      );
    },
    handleSignup() {
      const toast = useToast({ position: "top-right" });
      this.isLoading = true;
      const payload = {
        emailAddress: this.modelForm.emailAddress,
        firstname: this.modelForm.firstname,
        lastname: this.modelForm.lastname,
        phoneNumber: this.modelForm.phoneNumber,
        accountType: 1,
        accountRefNumber: "",
      };
      CreateUser(payload)
        .then((response) => {
          this.isLoading = false;
          if (response.responseCode == "06") {
            toast.error(response.responseDescription);
          } else {
            const link = response.result.resetPasswordLink;
            window.location.href = link;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.handleSignup();
    },
  },
};
</script>

<style>
:deep(.form-labels .ant-form-item-label > label) {
  color: #404164;
  font-weight: 350;
  line-height: 100%;
  font-size: 16px;
  font-family: "SF Compact Text";
}
:deep(.form-labels .ant-form-item-label) {
  display: flex !important;
  flex-direction: column !important;
  background-color: red !important;
}
</style>
