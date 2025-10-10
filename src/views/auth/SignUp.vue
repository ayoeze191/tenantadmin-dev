<template>
  <div class="w-full flex items-center">
    <auth-hero />
    <main class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
      <div class="mx-auto h-full">
        <!-- Responsive Header Text -->
        <div
          class="flex justify-center flex-col w-fit h-full mx-auto px-4 md:px-0"
        >
          <div>
            <img
              class="mr-auto mb-[24px] p-0 m-0"
              src="../../assets/logo.svg"
              alt="logo"
            />
            <p
              class="auth_header_text text-[24px] font-redwing mx-auto p-0 text-[#000000] m-0 md:text-4xl font-[500] text-left"
            >
              Signup as a Landlord
            </p>

            <!-- Responsive Subheader Text -->
            <p
              class="text-[#626262] mt-[4px] text-[14px] font-regular leading-[100%] mb-[24px]"
            >
              Create an account as a landlord to manage your properties
            </p>
          </div>
          <a-form class="auth_form" :rules="rule" :model="modelForm">
            <div>
              <section class="flex gap-4 phone:flex-col">
                <a-form-item
                  name="firstname"
                  class="w-full flex flex-col form-labels"
                >
                  <span
                    class="text-sm md:text-base font-medium font-inter text-[#404164]"
                    >First Name</span
                  >
                  <a-input
                    class="input w-full mt-2"
                    v-model:value="modelForm.firstname"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                  name="lastname"
                  class="w-full flex flex-col form-labels"
                >
                  <span
                    class="text-sm md:text-base mt-2 font-medium text-[#404164]"
                    >Last Name</span
                  >
                  <a-input
                    class="input w-full mt-2"
                    v-model:value="modelForm.lastname"
                    size="large"
                  />
                </a-form-item>
              </section>

              <a-form-item
                name="emailAddress"
                class="w-full form-labels flex flex-col font-inter"
              >
                <span
                  class="text-sm font-inter md:text-base font-medium text-[#404164]"
                  >Email Address</span
                >
                <a-input
                  class="input w-full mt-2"
                  v-model:value="modelForm.emailAddress"
                  size="large"
                  type="email"
                />
              </a-form-item>

              <a-form-item
                name="phoneNumber"
                class="w-full flex flex-col form-labels"
              >
                <span
                  class="text-sm md:text-base font-medium text-[#404164] font-inter"
                  >Phone Number</span
                >
                <a-input
                  class="input w-full mt-2"
                  v-model:value="modelForm.phoneNumber"
                  size="large"
                  type="number"
                />
              </a-form-item>
            </div>
            <p
              class="p-0 m-0 text-[#626262] text-[14px] leading-[21px] mb-[24px]"
            >
              By proceeding you agree to your
              <span class="text-[#020332] underline">Privacy Policy</span> and
              <span class="text-[#020332] underline"> Terms & Conditions</span>
            </p>
            <button
              class="btn btn_primary rounded-[100px] text-base sm:text-lg"
              @click="handleSubmit"
              :disabled="isDisabled()"
            >
              Continue
            </button>
          </a-form>
          <p class="text-center mt-[23px] p-0 text-sm leading-6 text-txt_dark">
            Already have an account?
            <router-link to="/login">
              <span
                class="text-[#404164] font-medium font-sf text-[14px] underline"
                >Login</span
              >
            </router-link>
          </p>
        </div>
        <!-- :disabled="isDisabled()" -->
        <!-- Responsive Footer Text -->
      </div>
    </main>
  </div>
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
import AuthHero from "@/components/AuthHero.vue";
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
    "auth-hero": AuthHero,
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
        !emailAddress.includes("@") ||
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
