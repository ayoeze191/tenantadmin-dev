<template>
  <a-layout-header
    class="w-full bg-white flex justify-between items-center px-10 py-3"
  >
    <section class="flex items-center gap-4">
      <a-select
        v-if="isCurrentRoute('/dashboard')"
        class="mr-4"
        size="large"
        default-value="All My Properties"
        style="width: 180px"
      >
        <a-select-option value="All My Properties"
          >All My Properties</a-select-option
        >
      </a-select>
      <h1 class="text-txt_dark font-semibold text-2xl leading-8">
        {{ routeName }}
      </h1>
    </section>
    <div class="flex items-center gap-6">
      <a-badge dot>
        <img
          class="w-6 h-6"
          src="../assets/notification.svg"
          alt="notification bell icon"
        />
      </a-badge>
      <a-dropdown placement="bottomRight" :trigger="['click']">
        <div
          class="flex items-center gap-3 cursor-pointer"
          @click="toggleDropdown"
        >
          <a-avatar :src="profileImage" size="large" />
          <div class="flex flex-col">
            <span class="text-txt_dark font-medium text-base leading-6.5"
              >{{ store.userProfile.firstname }}
              {{ store.userProfile.lastname }}</span
            >
            <span class="text-secondary text-sm">{{
              store.userProfile.role.name || "N/A"
            }}</span>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">Change Password</a-menu-item>
            <a-menu-item key="2">Edit Profile</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="LogUserOut">
              <router-link :to="{ name: 'login' }">Logout</router-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import { useUserStore } from "@/store";
import { Avatar, Badge, Dropdown, Layout, Menu, Select } from "ant-design-vue";

export default {
  components: {
    "a-layout-header": Layout.Header,
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    "a-menu-divider": Menu.Divider,
    "a-dropdown": Dropdown,
    "a-avatar": Avatar,
    "a-badge": Badge,
    "a-select": Select,
    "a-select-option": Select.Option,
  },
  computed: {
    routeName() {
      if (this.$route.path.includes("dashboard")) {
        return "Dashboard";
      } else if (this.$route.path.includes("service-requests")) {
        return "Service Request";
      } else if (this.$route.path.includes("tenants")) {
        return "My Tenants";
      } else if (this.$route.path.includes("applications")) {
        return "Applications";
      } else if (this.$route.path.includes("payments")) {
        return "Payments";
      } else if (this.$route.path.includes("properties")) {
        return "My Properties";
      } else if (this.$route.path.includes("roles")) {
        return "Roles";
      } else if (this.$route.path.includes("users")) {
        return "Users";
      } else return "";
    },
    profileImage() {
      // Use a real profile image if available, else fallback
      return (
        this.store.userProfile.profileImage ||
        "https://images.pexels.com/photos/19891768/pexels-photo-19891768/free-photo-of-model-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      );
    },
  },
  data() {
    return {
      store: useUserStore(),
    };
  },
  methods: {
    isCurrentRoute(route) {
      if (!route) return;
      return this.$route.path === route;
    },
    toggleDropdown() {
      // Ant Design handles dropdown visibility
    },
    LogUserOut() {
      this.store.logUserOut();
    },
  },
};
</script>

<style scoped>
.a-layout-header {
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 10;
}
</style>
