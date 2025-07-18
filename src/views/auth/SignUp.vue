<template>
  <main class="py-6 bg-white w-full h-screen overflow-y-scroll">
    <div class="w-4/6 mx-auto py-4 smallTablet:w-5/6">
      <img class="mx-auto w-21 mb-5" src="../../assets/logo.svg" alt="logo" />

      <!-- Responsive Header Text -->
      <p
        class="auth_header_text text-2xl sm:text-3xl md:text-4xl font-semibold text-center"
      >
        Sign Up
      </p>

      <!-- Responsive Subheader Text -->
      <p
        class="auth_subheader_text text-base sm:text-lg md:text-xl text-center text-txt_dark2 mt-2 mb-6"
      >
        Access your administrative account
      </p>

      <form class="auth_form">
        <div v-if="step == 1">
          <section class="flex gap-4 phone:flex-col">
            <!-- Form block -->
            <div class="w-full">
              <label
                for="firstName"
                class="input_label text-sm sm:text-base md:text-xl"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                class="input mt-4 mb-10"
                v-model="firstname"
              />
            </div>

            <!-- Form block -->
            <div class="w-full">
              <label
                for="lastName"
                class="input_label text-sm sm:text-base md:text-xl"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                class="input mt-4 mb-10"
                v-model="lastname"
              />
            </div>
          </section>
          <label
            for="emailAddress"
            class="input_label text-sm sm:text-base md:text-xl"
          >
            Email Address
          </label>
          <input
            id="email"
            name="emailAddress"
            class="input mt-4 mb-10"
            v-model="emailAddress"
          />

          <!-- Form block -->
          <label
            for="phoneNumber"
            class="input_label text-sm sm:text-base md:text-xl"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            class="input mt-4 mb-10"
            v-model="phoneNumber"
          />
        </div>
        <div v-if="step == 2">
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
        </div>

        <button
          class="btn btn_primary text-base sm:text-lg"
          @click="handleSubmit"
          :disabled="isDisabled()"
        >
          Sign Up
        </button>
      </form>
      <!-- :disabled="isDisabled()" -->
      <!-- Responsive Footer Text -->
      <p
        class="text-center mt-7 text-base sm:text-lg md:text-xl leading-6 text-txt_dark"
      >
        Already have an account?
        <router-link to="/login">
          <span class="text-primary font-bold">Login</span>
        </router-link>
      </p>
    </div>
  </main>
</template>

<script>
import { AddAdminUser } from "@/api/auth";
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

      isLoading: false,
      emailAddress: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      accountType: "",
      password: "",
      confirmpassword: "",
      store: useUserStore(),
      step: 1,
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
      if (this.step == 1) {
        if (
          !this.emailAddress ||
          !this.firstname ||
          !this.lastname ||
          !this.phoneNumber
        ) {
          return true;
        }
      } else if (this.step == 2) {
        if (!this.password || this.password !== this.confirmpassword) {
          return true;
        }
      }
      return false;
    },
    handleSignup() {
      const $toast = useToast({ position: "top-right" });
      this.isLoading = true;
      const payload = {
        emailAddress: this.emailAddress,
        firstname: this.firstname,
        lastname: this.lastname,
        phoneNumber: this.phoneNumber,
        accountType: 1,
      };
      CreateUser(payload).then((response) => {
        this.isLoading = false;
        $toast.success("Successfully Signuped, please log in");
        router.push("/login");
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.step == 2) {
        this.handleSignup();
      } else {
        this.step += 1;
      }
    },
  },
};
</script>

<style></style>
