<template>
  <a-layout-sider width="260" class="h-full min-h-screen overflow-y-auto bg-white">
    <div class="flex flex-col items-center py-4 pb-6">
      <img class="w-12 mb-3.5" src="../assets/logo.svg" alt="logo" />
      <p class="text-gray-600 font-medium text-sm leading-4 mb-3.5">Menu</p>
    </div>
    <a-menu
      mode="inline"
      :selectedKeys="[selectedKey]"
      :openKeys="openKeys"
      @openChange="onOpenChange"
    >
      <a-menu-item key="dashboard">
        <router-link :to="{ name: 'admin-dashboard' }">
          <template #icon><overview-icon /></template>
            Overview
        </router-link>
      </a-menu-item>
      <a-sub-menu key="service-requests" title="Service Requests">
        <template #icon><request-icon /></template>
        <a-menu-item key="pending-service-requests">
          <router-link :to="{ name: 'pending-service-requests' }"
            >Pending Request</router-link
          >
        </a-menu-item>
        <a-menu-item key="completed-service-requests">
          <router-link :to="{ name: 'completed-service-requests' }"
            >Completed Request</router-link
          >
        </a-menu-item>
        <a-menu-item key="all-service-requests">
          <router-link :to="{ name: 'all-service-requests' }"
            >All Request</router-link
          >
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="admin-applications">
        <router-link :to="{ name: 'admin-applications' }">
          <template #icon><application-icon /></template>
            Tenancy Applications
        </router-link>
      </a-menu-item>
      <a-sub-menu key="properties" title="My Properties">
        <template #icon><properties-icon /></template>
        <a-menu-item key="add-admin-properties">
          <router-link :to="{ name: 'add-admin-properties' }"
            >Add Properties</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-properties">
          <router-link :to="{ name: 'admin-properties' }"
            >View Properties</router-link
          >
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="tenants" title="My Tenants">
        <template #icon><tenants-icon /></template>
        <a-menu-item key="admin-tenants">
          <router-link :to="{ name: 'admin-tenants' }"
            >Tenant Overview</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-tenants-lease">
          <router-link :to="{ name: 'admin-tenants-lease' }"
            >Lease Management</router-link
          >
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="payments" title="My Payments">
        <template #icon><payments-icon /></template>
        <a-menu-item key="admin-payments-due">
          <router-link :to="{ name: 'admin-payments-due' }"
            >Payment Due</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-payments-rent">
          <router-link :to="{ name: 'admin-payments-rent' }"
            >Rent Payment</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-payments-utility">
          <router-link :to="{ name: 'admin-payments-utility' }"
            >Utility</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-payments-deposit">
          <router-link :to="{ name: 'admin-payments-deposit' }"
            >Security Deposit</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-payments-maintenance">
          <router-link :to="{ name: 'admin-payments-maintenance' }"
            >Maintenance Fee</router-link
          >
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="users" title="Users">
        <template #icon><users-icon /></template>
        <a-menu-item key="admin-users-landlord">
          <router-link :to="{ name: 'admin-users-landlord' }"
            >Landlord</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-users-admin">
          <router-link :to="{ name: 'admin-users-admin' }">Admin</router-link>
        </a-menu-item>
        <a-menu-item key="admin-users-register">
          <router-link :to="{ name: 'admin-users-register' }"
            >Register Admin User</router-link
          >
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="roles" title="Roles">
        <template #icon><roles-icon /></template>
        <a-menu-item key="admin-users-roles">
          <router-link :to="{ name: 'admin-users-roles' }"
            >View Roles</router-link
          >
        </a-menu-item>
        <a-menu-item key="admin-users-add-roles">
          <router-link :to="{ name: 'admin-users-add-roles' }"
            >Add Roles</router-link
          >
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="amenities">
        <router-link :to="{ name: 'amenities' }">
          <template #icon><amenities-icon /></template>
            Amenities
        </router-link>
      </a-menu-item>
      <a-menu-item key="admin-users-notification">
        <router-link :to="{ name: 'admin-users-notification' }">
          <template #icon><notification-icon /></template>
            User Notification
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { Layout, Menu } from "ant-design-vue";
import IconOverview from "./icons/IconOverview.vue";
import IconServiceRequest from "./icons/IconServiceRequests.vue";
import IconApplications from "./icons/IconApplications.vue";
import IconProperties from "./icons/IconProperties.vue";
import IconTenants from "./icons/IconTenants.vue";
import IconPayments from "./icons/IconPayments.vue";
import IconUser from "./icons/IconUser.vue";
import IconRoles from "./icons/IconRoles.vue";
import IconNotification from "./icons/IconNotification.vue";
import IconAmenities from "./icons/IconAmenities.vue";

export default {
  components: {
    "a-layout-sider": Layout.Sider,
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    "a-sub-menu": Menu.SubMenu,
    "overview-icon": IconOverview,
    "request-icon": IconServiceRequest,
    "application-icon": IconApplications,
    "properties-icon": IconProperties,
    "tenants-icon": IconTenants,
    "payments-icon": IconPayments,
    "users-icon": IconUser,
    "roles-icon": IconRoles,
    "notification-icon": IconNotification,
    "amenities-icon": IconAmenities,
  },
  data() {
    return {
      selectedKey: this.$route.name,
      openKeys: [],
    };
  },
  watch: {
    "$route.name"(val) {
      this.selectedKey = val;
    },
  },
  methods: {
    onOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
  },
};
</script>

<style scoped>
.a-layout-sider {
  background: #fff;
  min-height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 8px #f0f1f2;
}
</style>
