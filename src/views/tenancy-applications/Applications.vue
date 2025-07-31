<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <section class="flex pb-3 justify-between w-full border-b border-br1">
      <p class="font-medium text-lg text-secondary">All Applications (8)</p>
      <div class="flex gap-4">
        <search-icon />
        <div class="h-full border border-br1"></div>
        <status-select
          :label="'Filter by:'"
          :mode="'filter'"
          :filterOptions="['Show All']"
        />
      </div>
    </section>
    <ul class="w-full flex flex-wrap gap-4 py-10">
      <li
        v-for="(items, index) in dummyList"
        :key="items"
        class="py-3.5 px-2.5 border border-br1 bg-neutral_light rounded-[5px] w-full max-w-64 flex flex-col gap-[25px] text-center"
      >
        <img
          class="w-16 h-16 mx-auto rounded-full object-cover"
          :src="items"
          alt="user profile "
        />
        <p class="font-medium text-xl leading-6 text-txt_dark">
          Claudia Martins <br />
          <span class="text-secondary">Female, 24</span>
        </p>
        <ul class="w-full flex flex-col gap-[18px]">
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">Email</p>
            <p class="text-txt_dark text-xs leading-3.5">
              angelsmith@gmail.com
            </p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">Phone No</p>
            <p class="text-txt_dark text-xs leading-3.5">+1(250) 555-0199</p>
          </li>
          <li class="flex justify-between">
            <p class="text-primary text-xs leading-3.5 font-medium">
              Nationality
            </p>
            <p class="text-txt_dark text-xs leading-3.5">Nigerian</p>
          </li>
        </ul>
        <button
          class="btn btn_primary text-base py-[9px] rounded-md"
          @click="() => goto(index)"
        >
          View Full Details
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
import { useRouter } from "vue-router";
export default {
  name: "Applications",
  data() {
    return {
      selected_tab: "pending",
      selected_Request: {},
      router: useRouter(),
      dummyList: [
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1667053508464-eb11b394df83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1683792384436-167313660657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1667053508464-eb11b394df83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1683792384436-167313660657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
      ],
    };
  },
  components: {
    "search-icon": IconSearch,
    "status-select": StatusSelect,
    "modal-component": Modal,
  },
  methods: {
    goto(id) {
      this.router.push(`/applications/${id}`);
    },
    toggleTabs(value) {
      this.selected_tab = value;
    },
    openModal(request) {
      this.$refs.viewRequestModal.openModal();
      this.selected_Request = request;
    },
    onModalClose() {
      console.log("Modal was closed");
    },
  },
};
</script>
