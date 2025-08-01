<template>
  <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
    <router-link to="/tenants/lease">
      <p
        class="text-txt_dark flex gap-1 font-medium text-xl cursor-pointer mt-10"
      >
        <span class="my-auto">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4621_17743)">
              <path
                d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                fill="#808097"
              />
            </g>
            <defs>
              <clipPath id="clip0_4621_17743">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        Back
      </p>
    </router-link>

    <section class="list_container mt-4">
      <div class="flex w-full justify-between border-b border-br1 pb-3 mb-4">
        <p class="font-medium text-base text-secondary mr-0.5">All Leases</p>

        <status-select
          :label="'Filter By:'"
          :mode="'filter'"
          :filterOptions="filterOptions"
        ></status-select>
      </div>
      <ul>
        <li
          v-for="lease in waitingLeases"
          class="w-full rounded-md px-4 py-2 bg-grey mb-4"
        >
          <section class="flex w-full justify-between mb-4">
            <p class="font-medium text-lg leading-6 text-txt_dark">
              {{ lease.tenant?.firstname }} {{ lease.tenant?.lastname }}
              <span class="text-secondary ml-1"
                >{{ lease.apartmentName }}
              </span>
            </p>
            <div class="flex gap-2">
              <div
                class="py-1 px-2.5 h-5 my-auto rounded-2xl text-scs bg-scs_bg"
              >
                <p class="font-medium text-base leading-3">Renewal</p>
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
</template>

<script>
import { fetchWaitingLeases } from "@/api/landlord"; // adjust path as necessary
// import { handleError } from "@/utils/error"; // adjust path as necessary
import { useUserStore } from "@/store";

export default {
  data() {
    return {
      selected_requests_lease: {},
      waitingLeases: [],
      store: useUserStore(),
    };
  },
  created() {
    this.handleFetchWailtingLeases();
  },
  methods: {
    handleFetchWailtingLeases() {
      const query = {
        size: 50,
        page: 1,
        query: "",
      };

      fetchWaitingLeases(this.store.userProfile.referenceID, query).then(
        (response) => {
          if (response.responseCode === "00") {
            this.waitingLeases = response.serviceRequests.items;
          } else {
            handleError(response);
          }
        }
      );
    },
  },
};
</script>

<style></style>
