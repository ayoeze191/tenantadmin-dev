<template>
  <div class="px-4 font-inter">
    <div
      class="rounded-[16px] p-2.5 mt-4 font-inter border-[#36363633] border-[0.75px] border-solid"
    >
      <div class="flex justify-between">
        <table-header
          :total-item-count="totalItemCount || 0"
          title="All Requests"
        >
          <DropdownButton
            :label="selectedStatus"
            :options="[
              { label: 'Pending', value: 'Pending' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Terminated', value: 'Terminated' },
            ]"
            @select="handleSelect"
          />
          <!-- <button
            class="border-solid border-[1px] px-[12px] py-[8px] text-[#000000B2] leading-[24px] font-inter rounded-[8px]"
          >
            See all requests
          </button> -->
        </table-header>
      </div>
      <div class="w-full mt-4 h-full">
        <table-component
          title="Service Requests"
          :columns="headers"
          :data-source="data"
        >
          <template #action="{ record }">
            <div class="relative flex justify-center items-center group">
              <!-- Hidden div -->
              <div
                class="absolute text-[12px] z-10 right-2 top-0 p-5 border-[0.75px] border-solid rounded-[16px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <div
                  class="flex items-center gap-[8px] p-[10px] rounded-[10px] border-[0.75px] border-solid border-[#36363633]"
                >
                  <div class="flex h-[34px] w-[34px]">
                    <img src="/src/assets/TenantImage.svg" />
                  </div>
                  <div>
                    <p class="m-0 p-0 text-[]">
                      {{ record.name }}
                    </p>
                    <p class="m-0 p-0 mt-[2px]">{{ record.email }}</p>
                  </div>
                </div>
                <!-- asa -->
                <div class="mt-4 m-0">
                  <p class="text-[#000000]">
                    <span
                      class="text-[#00000099] text-[12px] font-medium leading-[20px]"
                      >Apartment:</span
                    >
                    {{ record.properties || "nill" }}
                  </p>
                  <p>
                    <span class="text-[#00000099]">Rent Amount:</span> ${{
                      record.bills
                    }}
                  </p>
                  <p>
                    <span class="text-[#00000099]">Rent Due:</span>
                    {{ record.due || "nill" }}
                  </p>
                  <p>
                    <span class="text-[#00000099]">Lease Expires:</span>
                    {{ record.rent || "nill" }}
                  </p>
                  <div>
                    <span class="text-[#00000099]">Lease:</span> View Tenant
                  </div>
                </div>

                <a-button
                  @click="
                    () => {
                      selectedTenant = record;
                      showModal = true;
                    }
                  "
                  class="py-[8px] w-full flex items-center justify-center bg-[#000130] text-white mt-6 text-[14px] rounded-[8px]"
                >
                  Send notification to Tenant
                </a-button>
              </div>
              <a-button
                class="bg-[#000130] bg-inherit text-black cursor-pointer"
                >View Info</a-button
              >
            </div>
          </template>
        </table-component>
      </div>
    </div>
  </div>
</template>

<script>
import TenantCard from "@/components/TenantCard.vue";
import TableHeader from "@/components/TableHeader.vue";
import V2Table from "@/components/V2Table.vue";
import V2ServiceRequestsDropDown from "@/components/V2ServiceRequestsDropDown.vue";

export default {
  components: {
    "table-component": V2Table,
    DropdownButton: V2ServiceRequestsDropDown,
    "table-header": TableHeader,
    TenantCard,
  },
  methods: {
    handleSelect(option) {
      this.selectedStatus = option.value;
      // console.log("Selected:", option);
    },
  },
  data() {
    return {
      selectedStatus: "status",
      data: [],
      headers: [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Property",
          dataIndex: "properties",
          className: "properties",
        },
        {
          title: "Unit Number",
          className: "email",
          dataIndex: "email",
        },
        {
          title: "Status",
          dataIndex: "isVerified",
        },
        {
          title: "",
          dataIndex: "lastLoginDate",
        },
        { title: "action", dataIndex: "action", slotName: "action" },
      ],
    };
  },
};
</script>
