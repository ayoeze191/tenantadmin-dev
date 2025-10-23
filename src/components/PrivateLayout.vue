<template>
  <main class="flex w-full h-screen overflow-hidden bg-[#111921]">
    <side-bar />
    <section
      class="flex flex-col w-full h-full bg-[#FFFFFF] mt-[1rem] rounded-[18px]"
    >
      <top-nav />
      <div class="flex-1 overflow-y-auto">
        <router-view></router-view>
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
