<template>
  <main class="flex w-full bg-white h-screen overflow-hidden">
    <side-bar/>
    <section class="w-full">
      <top-nav/>
      <div class="w-full h-full">
        <router-view></router-view>

      </div>
    </section>
  </main>
</template>

<script>
    import TopNav from './TopNav.vue';
    import SideBar from './SideBar.vue';
    export default {
        components:{
            'top-nav': TopNav,
            'side-bar': SideBar,
        }
    }
</script>

<style>

</style>