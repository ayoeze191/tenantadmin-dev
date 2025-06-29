<template>
  <main class="flex w-full h-screen overflow-hidden bg-white">
    <side-bar />
    <section class="flex flex-col w-full h-full">
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
export default {
  components: {
    "top-nav": TopNav,
    "side-bar": SideBar,
  },
};
</script>

<style></style>
