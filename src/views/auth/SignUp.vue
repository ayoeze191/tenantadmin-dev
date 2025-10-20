<template>
  <div class="w-full flex items-center">
    <auth-hero />
    <main class="bg-[#FAFCFF] flex-1 h-screen overflow-y-scroll">
      <div class="mx-auto h-full">
        <!-- Responsive Header Text -->
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
              class="auth_header_text text-[24px] font-redwing mx-auto p-0 text-[#000000] m-0 md:text-4xl font-[500] text-left"
            >
              {{
                step == 0
                  ? "Signup as a Landlord"
                  : step == 1
                  ? "Enter OTP"
                  : "Complete Onboarding"
              }}
            </p>

            <!-- Responsive Subheader Text -->
            <p
              class="text-[#626262] mt-[4px] text-[14px] font-regular leading-[100%] mb-[24px]"
            >
              {{
                step == 0
                  ? "Create an account as a landlord to manage your properties"
                  : step == 1
                  ? "We have sent a 6-digit verification code to your email"
                  : "Provide the following details to complete your onboarding"
              }}
            </p>
          </div>
          <a-form class="auth_form w-full" :rules="rule" :model="modelForm">
            <div v-if="step == 0">
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
                @input="handleInput(index)"
                @keydown.backspace="handleBackspace(index, $event)"
                ref="otpInputs"
              />
            </div>
            <div v-if="step == 2">
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
                    :disabled="true"
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
                <span class="text-[#020332] underline">
                  Terms & Conditions</span
                >
              </p>
            </div>

            <button
              class="py-[13px] w-full btn_primary flex gap-2 justify-center rounded-[100px] text-sm sm:text-lg disabled:bg-[#bfbfbf] disabled:cursor-not-allowed"
              @click="handleSubmit"
              :disabled="isDisabled()"
            >
              <a-spin
                v-if="isLoading == true"
                :tip="tip"
                size="large"
                :indicator="customIcon"
              >
                <slot />
              </a-spin>
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
import { CreateUser, ResendOtp, VerifyOtp } from "@/api/auth";
import { useUserStore } from "@/store";
import Button from "@/components/Button.vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import IconViewPassword from "@/components/icons/iconViewPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
import AuthHero from "@/components/AuthHero.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";

export default {
  data() {
    return {
      viewPassword: false,
      viewConfirmPassword: false,
      step: 0,
      received_otp: "",
      otp: ["", "", "", "", "", ""],
      router: useRouter(),
      isLoading: false,
      customIcon: h(LoadingOutlined, {
        style: {
          fontSize: "15px",
          color: "#1890ff",
        },
      }),
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
    handleInput(index) {
      if (this.otp[index].length === 1 && index < this.otp.length - 1) {
        this.$refs.otpInputs[index + 1].focus();
      }
    },
    handleBackspace(index, event) {
      if (event.key === "Backspace" && this.otp[index] === "" && index > 0) {
        this.$refs.otpInputs[index - 1].focus();
      }
    },
    togglePassword() {
      this.viewPassword = !this.viewPassword;
    },
    toggleConfirmPassword() {
      this.viewConfirmPassword = !this.viewConfirmPassword;
    },
    isDisabled() {
      if (this.step == 0) {
        return (
          !this.modelForm.emailAddress?.trim() ||
          this.isLoading ||
          !this.modelForm.emailAddress.includes("@")
        );
      } else if (this.step == 1) {
        return this.otp.join("").length < 6 || this.isLoading;
      }
      const { emailAddress, firstname, lastname, phoneNumber } = this.modelForm;
      return (
        !emailAddress?.trim() ||
        !emailAddress.includes("@") ||
        !firstname?.trim() ||
        !lastname?.trim() ||
        !phoneNumber?.trim() ||
        !/^\d{7,15}$/.test(phoneNumber) ||
        this.isLoading // optional: validate phone format
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
    async handleSubmit(e) {
      this.isLoading = true;

      e.preventDefault();
      if (this.step == 0) {
        const res = await ResendOtp({
          emailAddress: this.modelForm.emailAddress,
        });
        if (res.responseCode == "00") {
          this.received_otp = res.otp;
          this.step = 1;
          this.isLoading = false;
          return;
        }
      } else if (this.step == 1) {
        if (this.received_otp !== "") {
          if (this.otp.join("") !== this.received_otp) {
            const toast = useToast({ position: "top-right" });
            toast.error("Invalid OTP");
            this.isLoading = false;
            return;
          } else {
            this.step = 2;
            const toast = useToast({ position: "top-right" });
            toast.success("Email Verified Successfully");
            this.isLoading = false;

            return;
          }
        } else {
          const res = await VerifyOtp({
            emailAddress: this.modelForm.emailAddress,
            otp: this.otp.join(""),
          });
          if (res.responseCode == "00") {
            this.step = 2;
            const toast = useToast({ position: "top-right" });
            toast.success("Email Verified Successfully");
            this.isLoading = false;

            return;
          }
        }
      }
      this.handleSignup();
      this.isLoading = false;
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
