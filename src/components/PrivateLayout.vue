<template>
  <main class="flex w-full h-screen overflow-hidden bg-[#111921]">
    <side-bar />
    <section
      class="flex flex-col w-full h-full bg-[#FFFFFF] mt-[1rem] rounded-[18px]"
    >
      <top-nav />
      <div class="flex-1 pt-4 h-full">
        <router-view v-if="store.userProfile.isVerified == true"></router-view>
        <div
          v-else
          class="flex flex-col items-center justify-center h-full text-center px-4"
        >
          <!-- <img src="../assets/verification-required.svg" /> -->
          <h2 class="text-2xl font-semibold text-white mt-6">
            Verification Required
          </h2>
          <p class="text-white mt-4 max-w-md">
            Your account is not verified yet. Please reach out to the support
            team for assistance.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SideBar from "./SideBar.vue";
import TopNav from "./TopNav.vue";
import { useUserStore } from "@/store";
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": SideBar,
  },
  data() {
    return {
      store: useUserStore(),
    };
  },
};
</script>

<style></style>
