<template>
  <div
    class="bg-neutral py-[50px] px-10 w-full overflow-y-scroll h-screen pb-40"
  >
    <p class="text-txt_dark font-semibold text-[24px] leading-[100%] uppercase">
      Lease Management
    </p>
    <div class="flex justify-between w-full">
      <p
        class="mb-5 text-[#808097] text-[18px] font-[600] text-lg leading-[25px] uppercase font-sf"
      >
        Approval Requests (4)
      </p>
      <router-link to="/tenants/lease/pending">
        <p class="text-txt_dark flex gap-1 font-medium text-sm cursor-pointer">
          See all
          <span class="my-auto">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8.5026L4 8.5026M8.66667 5.16927L12 8.5026L8.66667 5.16927ZM12 8.5026L8.66667 11.8359L12 8.5026Z"
                stroke="#404164"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </p>
      </router-link>
    </div>
    <ul class="flex w-full gap-3 largeTablet:flex-wrap">
      <li
        class="bg-white py-2.5 px-4 rounded-lg w-[350px] min-h-[108px] flex flex-col justify-between"
      >
        <div class="flex justify-between">
          <div>
            <p class="font-medium text-txt_dark">B-29, Brina Apartments</p>
            <p class="font-medium text-secondary text-xs leading-5">
              Tenant: Steph Orkuma, Derek Jones
            </p>
          </div>
          <p
            class="py-1 px-2.5 font-medium text-xs leading-3 text-scs bg-scs_bg h-5 my-auto rounded-2xl"
          >
            Recieved
          </p>
        </div>
        <a
          class="text-sm leading-6 text-txt_dark cursor-pointer underline"
          @click="openModal({})"
          >View full details</a
        >
      </li>
      <li
        class="bg-white py-2.5 px-4 rounded-lg w-[350px] min-h-[108px] flex flex-col justify-between"
      >
        <div class="flex justify-between">
          <div>
            <p class="font-medium text-txt_dark">B-29, Brina Apartments</p>
            <p class="font-medium text-secondary text-xs leading-5">
              Tenant: Steph Orkuma, Derek Jones
            </p>
          </div>
          <p
            class="py-1 px-2.5 font-medium text-xs leading-3 text-pnd bg-pending h-5 my-auto rounded-2xl"
          >
            Sublease
          </p>
        </div>
        <a
          class="text-sm leading-6 text-txt_dark cursor-pointer underline"
          @click="openModal({})"
          >View full details</a
        >
      </li>
      <li
        class="bg-white py-2.5 px-4 rounded-lg w-[350px] min-h-[108px] flex flex-col justify-between"
      >
        <div class="flex justify-between">
          <div>
            <p class="font-medium text-txt_dark">B-29, Brina Apartments</p>
            <p class="font-medium text-secondary text-xs leading-5">
              Tenant: Steph Orkuma, Derek Jones
            </p>
          </div>
          <p
            class="py-1 px-2.5 font-medium text-xs leading-3 text-pnd bg-pending h-5 my-auto rounded-2xl"
          >
            Sublease
          </p>
        </div>
        <a
          class="text-sm leading-6 text-txt_dark cursor-pointer underline"
          @click="openModal({})"
          >View full details</a
        >
      </li>
      <li class="my-auto cursor-pointer">
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="32" height="32" rx="16" fill="#EDEDED" />
          <g clip-path="url(#clip0_4249_16179)">
            <path
              d="M12.4219 10.7493L17.6752 16.0026L12.4219 21.2559L13.8352 22.6693L20.5019 16.0026L13.8352 9.33594L12.4219 10.7493Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_4249_16179">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(8.5 8)"
              />
            </clipPath>
          </defs>
        </svg>
      </li>
    </ul>

    <section class="list_container mt-10">
      <div class="flex w-full justify-between border-b border-br1 pb-3 mb-4">
        <p class="font-medium text-base text-secondary mr-0.5">All Leases</p>

        <status-select
          :label="'Filter By:'"
          :mode="'filter'"
          :filterOptions="filterOptions"
        ></status-select>
      </div>
      <ul>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-secondary ml-1"
                >Apt T-69, Sean Apartments
              </span>
            </p>

            <div class="flex gap-2">
              <p class="text-secondary font-semibold leading-7">
                Lease Expires:
              </p>
              <div class="status_select bg-bg1">
                <p class="text-txt_dark">21/12/21</p>
              </div>
            </div>
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-secondary ml-1"
                >Apt T-69, Sean Apartments
              </span>
            </p>
            <div class="flex gap-2">
              <p class="text-secondary font-semibold leading-7">
                Lease Expires:
              </p>
              <div class="status_select bg-bg1">
                <p class="text-txt_dark">21/12/21</p>
              </div>
            </div>
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-secondary ml-1"
                >Apt T-69, Sean Apartments
              </span>
            </p>
            <div class="flex gap-2">
              <p class="text-secondary font-semibold leading-7">
                Lease Expires:
              </p>
              <div class="status_select bg-bg1">
                <p class="text-txt_dark">21/12/21</p>
              </div>
            </div>
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-secondary ml-1"
                >Apt T-69, Sean Apartments
              </span>
            </p>
            <div class="flex gap-2">
              <p class="text-secondary font-semibold leading-7">
                Lease Expires:
              </p>
              <div class="status_select bg-bg1">
                <p class="text-txt_dark">21/12/21</p>
              </div>
            </div>
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
            @click="openModal({})"
            >View tenant information</a
          >
        </li>
        <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              Steph Orkuma
              <span class="text-secondary ml-1"
                >Apt T-69, Sean Apartments
              </span>
            </p>
            <div class="flex gap-2">
              <p class="text-secondary font-semibold leading-7">
                Lease Expires:
              </p>
              <div class="status_select bg-bg1">
                <p class="text-txt_dark">21/12/21</p>
              </div>
            </div>
          </section>
          <a
            class="text-sm leading-6 text-txt_dark cursor-pointer underline"
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
    :button_label="'Save Changes'"
  >
    <ul class="grid grid-cols-2 gap-11 w-full max-w-[691px] mx-auto">
      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Tenant(s):</p>
          <p class="text-txt_dark leading-7">Steph Orkuma, Derek Jones</p>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Description(s):</p>
          <p class="text-txt_dark leading-7">
            Last night my roof began to leak right above my bed. Second room on
            your left.
          </p>
        </div>
      </li>
      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Issue:</p>
          <p class="text-txt_dark leading-7">Leaking Roof</p>
        </div>
      </li>
      <li>
        <div class="flex gap-2">
          <p class="text-secondary font-medium leading-7">Image:</p>
          <div class="rounded-md py-1.5 px-5 bg-bg1 flex gap-2 justify-center">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_4249_15161)">
                <path
                  d="M16.3333 4.66667V16.3333H4.66667V4.66667H16.3333ZM16.3333 3H4.66667C3.75 3 3 3.75 3 4.66667V16.3333C3 17.25 3.75 18 4.66667 18H16.3333C17.25 18 18 17.25 18 16.3333V4.66667C18 3.75 17.25 3 16.3333 3ZM12.2833 10.3833L9.78333 13.6083L8 11.45L5.5 14.6667H15.5L12.2833 10.3833Z"
                  fill="#323232"
                />
              </g>
              <defs>
                <clipPath id="clip0_4249_15161">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p class="font-medium text-sm leading-6 text-txt_dark">
              IMG.9876.JPG
            </p>
          </div>
        </div>
      </li>
      <li>
        <status-select :label="'Service Request Status:'" />
      </li>
    </ul>
  </modal-component>
</template>

<script>
import StatusSelect from "@/components/StatusSelect.vue";
import IconSearch from "../../components/icons/IconSearch.vue";
import Modal from "@/components/Modal.vue";
import { useUserStore } from "@/store";
import { FetchLeases } from "@/api/landlord";
export default {
  data() {
    return {
      selected_tab: "tenants",
      selected_Request: {},
      filterOptions: ["Show All"],
      store: useUserStore(),
    };
  },
  created() {
    this.handleFetchLeases();
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
    handleFetchLeases() {
      const query = {
        size: 50,
        page: 1,
        query: "",
      };
      FetchLeases(this.store.userProfile.adminUserID, query).then(
        (response) => {
          console.log(response, "resposne");
          if (response.properties) {
            this.propertyList = response.properties.items;
          } else handleError(response);
        }
      );
    },
  },
};
</script>

<style></style>
