<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">
      Register Admin User
    </p>

    <form
      class="auth_form bg-white rounded-xl"
      @submit.prevent="handleRegisterAdmin()"
    >
      <!-- form block  -->
      <div class="w-full">
        <label for="role" class="input_label"> Role </label>
        <vue-select
          id="role"
          name="role"
          class="mt-4 mb-10"
          v-model="role"
          :options="rolesData"
          label="name"
        />
      </div>
      <section class="flex gap-4 phone:flex-col">
        <!-- form block  -->
        <div class="w-full">
          <label for="firstName" class="input_label"> First Name </label>
          <input
            id="firstName"
            name="firstName"
            class="input mt-4 mb-10"
            v-model="first_name"
          />
        </div>
        <!-- form block  -->
        <div class="w-full">
          <label for="lastName" class="input_label"> Last Name </label>
          <input
            id="lastName"
            name="lastName"
            class="input mt-4 mb-10"
            v-model="last_name"
          />
        </div>
      </section>
      <!-- form block  -->
      <label for="email" class="input_label"> Email Address </label>
      <input id="email" name="email" class="input mt-4 mb-10" v-model="email" />
      <!-- form block  -->
      <label for="password" class="input_label"> Password </label>
      <input
        id="password"
        name="password"
        class="input mt-4 mb-10"
        v-model="password"
      />

      <button class="btn btn_primary" :disabled="isDisabled()">
        Register User
      </button>
    </form>
  </div>
</template>

<script>
import { AddAdminUser } from "@/api/auth";
import { FetchRoles } from "@/api/role";
import handleError from "@/utils/handleError";
import { handleToast } from "@/utils/helper";
import vueSelect from "vue-select";

export default {
  components: {
    "vue-select": vueSelect,
  },
  created() {
    this.handleFetchRoles();
    this.first_name = this.$route.query.firstname || "";
    this.last_name = this.$route.query.lastname || "";
    this.email = this.$route.query.emailAddress || "";
  },
  data() {
    return {
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      rolesData: [],
    };
  },
  methods: {
    handleFetchRoles() {
      FetchRoles().then((response) => {
        if (response.result.responseCode == "00") {
          this.rolesData = response.result.roles.items;
          console.log(response.result.roles.items);
        } else handleError(response);
      });
    },
    isDisabled() {
      if (
        !this.first_name ||
        !this.last_name ||
        !this.role ||
        !this.password ||
        !this.email
      ) {
        return true;
      } else return false;
    },
    handleFormReset() {
      this.role = "";
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.password = "";
    },
    handleRegisterAdmin() {
      const payload = {
        firstname: this.first_name,
        lastname: this.last_name,
        email: this.email,
        roleId: this.role.id,
        password: this.password,
        isVerified: false,
      };
      AddAdminUser(payload).then((response) => {
        if (response.responseCode == "00") {
          this.handleFormReset();
          handleToast("Admin Added Successfully", "success");
        } else handleError(response);
      });
    },
  },
};
</script>

<style></style>
