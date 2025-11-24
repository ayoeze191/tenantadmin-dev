<template>
  <a-layout-header
    class="w-full flex justify-between items-center bg-[]"
  >
    <div
      class="text-[#000000] bg-[#F7F7F7] px-[16px] py-2 w-full border-[#36363633] border-[0.75px] rounded-[8px] font-redwing text-[18px] font-medium leading-[100%]"
    >
      {{ routeName }}
    </div>
    <!-- <section class="flex items-center gap-4">
      <a-select
        v-if="isCurrentRoute('/dashboard')"
        class="mr-4"
        size="medium"
        default-value="All My Properties"
        style="width: 180px"
      >
        <a-select-option value="All My Properties"
          >All My Properties</a-select-option
        >
      </a-select>
      <h1
        class="text-txt_dark font-[600] text-[36px] leading-[100%]"
        :style="{ fontFamily: 'SF Compact Text' }"
      >
        {{ routeName }}
      </h1>
    </section>
    <div class="flex items-center gap-2">
      <a-popover
        placement="bottomRight"
        trigger="click"
        v-model:visible="notificationPopoverVisible"
        overlayClassName="notification-popover"
      >
        <template #content>
          <div class="bg-white rounded-2xl max-w-[400px] w-full font-sans">
            <div class="flex items-center justify-between px-2 pb-1">
              <span class="text-lg font-bold text-[#23234a]"
                >Your Notifications</span
              >
              <a-button
                type="text"
                shape="circle"
                size="small"
                class="ml-2"
                @click="notificationPopoverVisible = false"
              >
                <template #icon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="#23234a"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </template>
              </a-button>
            </div>
            <a-tabs v-model:activeKey="activeTab" class="px-2 mb-2">
              <a-tab-pane key="all">
                <template #tab>
                  <span class="flex items-center gap-2 text-base font-medium">
                    All
                    <a-badge :count="12" />
                  </span>
                </template>
              </a-tab-pane>
              <a-tab-pane key="rent">
                <template #tab>
                  <span class="flex items-center gap-2 text-sm font-medium">
                    Rent
                    <a-badge :count="12" />
                  </span>
                </template>
              </a-tab-pane>
              <a-tab-pane key="service">
                <template #tab>
                  <span class="flex items-center gap-2 text-sm font-medium">
                    Service Requests
                    <a-badge :count="6" />
                  </span>
                </template>
              </a-tab-pane>
              <a-tab-pane key="lease">
                <template #tab>
                  <span class="flex items-center gap-2 text-sm font-medium">
                    Lease
                    <a-badge :count="8" />
                  </span>
                </template>
              </a-tab-pane>
            </a-tabs>
            <div class="px-2 pb-4 max-h-[55vh] overflow-y-auto">
              <div
                v-for="(item, idx) in filteredNotifications"
                :key="idx"
                class="flex items-start gap-3 bg-[#f7f8fa] rounded-xl py-3 px-3 mb-3 last:mb-0"
              >
                <img
                  :src="item.avatar"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div class="flex-1 flex flex-col">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm font-semibold text-[#23234a]">{{
                      item.title
                    }}</span>
                    <span
                      class="w-2.5 h-2.5 bg-[#000130] rounded-full mr-1"
                    ></span>
                    <span class="text-xs text-[#8c8ca1] ml-auto">{{
                      item.time
                    }}</span>
                  </div>
                  <div class="text-sm text-[#6b6b8a] mb-1.5">
                    {{ item.desc }}
                  </div>
                  <div v-if="item.action" class="mt-1">
                    <a
                      href="#"
                      class="text-[#23234a] font-semibold underline text-xs cursor-pointer"
                      >{{ item.action }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <a-badge dot class="mr-4">
          <img
            class="w-6 h-6 cursor-pointer"
            src="../assets/notification.svg"
            alt="notification bell icon"
          />
        </a-badge>
      </a-popover>
      <a-dropdown placement="bottomRight" :trigger="['click']">
        <div
          class="flex items-center gap-3 cursor-pointer"
          @click="toggleDropdown"
        >
          <a-avatar size="large">
            <UserOutlined />
          </a-avatar>
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
    </div> -->
  </a-layout-header>
</template>

<script>
import { useUserStore } from "@/store";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  Menu,
  Popover,
  Select,
  Tabs,
} from "ant-design-vue";

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
    "a-tabs": Tabs,
    "a-tab-pane": Tabs.TabPane,
    "a-popover": Popover,
    "a-button": Button,
  },
  data() {
    return {
      store: useUserStore(),
      activeTab: "all",
      notificationPopoverVisible: false,
      notifications: [
        {
          type: "service",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          title: "New Maintenance Request",
          time: "2 hours ago",
          desc: "Leaky roof reported by Steph in Unit B-29, Brina Apartments.",
        },
        {
          type: "rent",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          title: "Rent Due Reminder",
          time: "3 hours ago",
          desc: "Rent due for Steph (Unit B-29) on Aug 19th. Amount: C$1400.",
          action: "SEND REMINDER",
        },
        {
          type: "lease",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          title: "Lease Expiration Notice",
          time: "3 hours ago",
          desc: "Lease for Steph (Unit B-29) expires Sept 4th.",
          action: "RENEW LEASE",
        },
        {
          type: "rent",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          title: "Rent Payment Received",
          time: "4 hours ago",
          desc: "C$1400 rent received from Steph (Unit B-29) for August.",
        },
      ],
    };
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
      } else if (this.$route.path.includes("amenities")) {
        return "Amenities";
      } else return "";
    },
    profileImage() {
      // Use a real profile image if available, else fallback
      return (
        this.store.userProfile.profileImage ||
        "https://images.pexels.com/photos/19891768/pexels-photo-19891768/free-photo-of-model-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      );
    },
    filteredNotifications() {
      if (this.activeTab === "all") return this.notifications;
      if (this.activeTab === "rent")
        return this.notifications.filter((n) => n.type === "rent");
      if (this.activeTab === "service")
        return this.notifications.filter((n) => n.type === "service");
      if (this.activeTab === "lease")
        return this.notifications.filter((n) => n.type === "lease");
      return this.notifications;
    },
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
    renderTab(label, count) {
      return `${label} <span class='notification-tab-count'>${count}</span>`;
    },
  },
};
</script>
