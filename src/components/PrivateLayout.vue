<template>
  <main class="flex w-full h-full bg-primary gap-3 box-border">
    <side-bar />
    <section
      class="flex flex-col w-full h-full bg-[#FFFFFF] rounded-[18px] box-border p-[1rem]"
    >
      <top-nav />
      <div class="flex-1 pt-4 h-full">
        <div class="h-full" v-if="store.userProfile.isVerified == true">
          <router-view v-if="!store.loading"></router-view>
          <Loader />
        </div>
        <!--  -->
        <div
          v-else
          class="flex flex-col items-center justify-center h-full text-center px-4"
        >
          <h2 class="text-2xl font-semibold text-black mt-6">
            Verification Required
          </h2>
          <p class="mt-4 max-w-md text-black">
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
import Loader from "./Loader.vue";
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": SideBar,
    Loader,
  },
  data() {
    return {
      store: useUserStore(),
    };
  },
};
</script>

<style></style>
