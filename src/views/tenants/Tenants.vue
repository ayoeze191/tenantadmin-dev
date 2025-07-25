<template>
  <div class="bg-neutral px-10 w-full overflow-y-scroll h-screen pb-40">
    <div class="flex m-0 mt-[40px] justify-between items-center mb-[30px]">
      <p class="text-txt_dark text-[24px] font-sf font-semibold m-0">
        TENANTS OVERVIEW
      </p>
      <button
        class="bg-[#000130] py-[9px] px-[32px] m-0 text-white leading-[25px] font-semibold rounded-[4px]"
      >
        + Add Tenant
      </button>
    </div>
    <section class="list_container">
      <div class="flex w-full justify-between border-b border-br1 pb-3 mb-4">
        <p
          class="font-medium text-[14px] md:text-[16px] lg:text-[18px] mr-0.5 text-[#808097]"
        >
          Total Number of Tenants:
          <span class="font-[700] font-sf text-[18px]">(43)</span>
        </p>
        <!-- <aside class="flex gap-3.5">
          <search-icon />
          <div class="pl-3.5 flex border-l border-br1">
            <status-select
              :label="'Filter By:'"
              :mode="'filter'"
              :filterOptions="filterOptions"
            ></status-select>
          </div>
        </aside> -->
      </div>
      <ul>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between m-0">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-[#808097] font-sf font-[600]"
                >Apt T-69, Sean Apartments
              </span>
            </p>

            <div class="flex gap-2 items-center font-sf">
              <p class="text-[#808097] font-semibold leading-7 m-0 font-sf">
                Rent Due:
              </p>

              <p
                class="text-txt_dark items-center flex px-2 py-[2px] rounded-[26px] m-0"
              >
                21/12/21
              </p>
            </div>
          </section>
          <a
            class="text-sm m-0 font-sf text-[#404164] cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between m-0">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-[#808097] font-sf font-[600]"
                >Apt T-69, Sean Apartments
              </span>
            </p>

            <div class="flex gap-2 items-center font-sf">
              <p class="text-[#808097] font-semibold leading-7 m-0 font-sf">
                Rent Due:
              </p>

              <p
                class="text-txt_dark bg-bg1 items-center flex px-2 py-[2px] rounded-[26px] m-0"
              >
                21/12/21
              </p>
            </div>
          </section>
          <a
            class="text-sm m-0 font-sf text-[#404164] cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between m-0">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-[#808097] font-sf font-[600]"
                >Apt T-69, Sean Apartments
              </span>
            </p>

            <div class="flex gap-2 items-center font-sf">
              <p class="text-[#808097] font-semibold leading-7 m-0 font-sf">
                Rent Due:
              </p>

              <p
                class="text-txt_dark bg-bg1 items-center flex px-2 py-[2px] rounded-[26px] m-0"
              >
                21/12/21
              </p>
            </div>
          </section>
          <a
            class="text-sm m-0 font-sf text-[#404164] cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between m-0">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-[#808097] font-sf font-[600]">Apt T-69, </span>
            </p>

            <div class="flex gap-2 items-center font-sf">
              <p class="text-[#808097] font-semibold leading-7 m-0 font-sf">
                Rent Due:
              </p>

              <p
                class="text-txt_dark bg-bg1 items-center flex px-2 py-[2px] rounded-[26px] m-0"
              >
                21/12/21
              </p>
            </div>
          </section>
          <a
            class="text-sm m-0 font-sf text-[#404164] cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between m-0">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-[#808097] font-sf font-[600]"
                >Apt T-69, Sean Apartments
              </span>
            </p>

            <div class="flex gap-2 items-center font-sf">
              <p class="text-[#808097] font-semibold leading-7 m-0 font-sf">
                Rent Due:
              </p>

              <p
                class="text-txt_dark bg-bg1 items-center flex px-2 py-[2px] rounded-[26px] m-0"
              >
                21/12/21
              </p>
            </div>
          </section>
          <a
            class="text-sm m-0 font-sf text-[#404164] cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
      </ul>
    </section>
  </div>

  <modal-component
    ref="viewRequestModal"
    title="B-29 Brina Apartments"
    @close="onModalClose"
    :button_label="'Send Notifications to tenant'"
  >
    <ul class="grid gap-11 w-full max-w-[691px] mx-auto">
      <li>
        <div class="flex gap-2">
          <p class="text-[#404164] font-medium leading-7">Email Address</p>
          <p class="text-txt_dark leading-7">Steph Orkuma, Derek Jones</p>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-2">
          <p class="text-[#404164] font-medium leading-7">Apartment:</p>
          <p class="text-txt_dark leading-7">B-29, Brina Apartments</p>
        </div>
      </li>
      <li>
        <div class="flex gap-2">
          <p class="text-[#404164] font-medium leading-7">Rent Amount:</p>
          <p class="text-txt_dark leading-7">700</p>
        </div>
      </li>
      <li>
        <div class="flex gap-2">
          <p class="text-[#404164] font-medium leading-7">Rent Due:</p>
          <div class="rounded-md py-1.5 px-5 flex gap-2 justify-center">
            <p class="font-medium text-sm leading-6 text-txt_dark">21/12/21</p>
          </div>
        </div>
        <div class="flex gap-2">
          <p class="text-[#404164] font-medium leading-7">Lease Expires:</p>
          <div class="rounded-md py-1.5 px-5 flex gap-2 justify-center">
            <p class="font-medium text-sm leading-6 text-txt_dark underline">
              View tenant lease
            </p>
          </div>
        </div>
      </li>
      <li>
        <!-- <status-select :label="'Service Request Status:'" /> -->
      </li>
    </ul>
  </modal-component>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
export default {
  data() {
    return {
      selected_tab: "tenants",
      selected_Request: {},
      filterOptions: ["Show All"],
    };
  },
  components: {
    "search-icon": IconSearch,
    "status-select": StatusSelect,
    "modal-component": Modal,
  },
  methods: {
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

<style></style>
