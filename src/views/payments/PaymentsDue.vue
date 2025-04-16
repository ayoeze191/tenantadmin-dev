<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
      <ul class="tab">
          <li class="tab_item" :class="{selected_tab: selected_tab === 'pending'}" @click="toggleTabs('pending')">Pending Requests</li>
          <li class="tab_item" :class="{selected_tab: selected_tab === 'completed'}" @click="toggleTabs('completed')">Completed Requests</li>
          <li class="tab_item" :class="{selected_tab: selected_tab === 'all'}" @click="toggleTabs('all')">All Requests</li>
      </ul>
      <section class="list_container mt-10">
          <div class=" flex w-full justify-between border-b border-br1 pb-3 mb-4">
              <p class="font-medium text-base text-secondary mr-0.5">Pending Service Requests  <span class="text-primary font-semibold text-[18px]">(5)</span></p>
              <aside class="flex gap-3.5">
                  <search-icon/>
                  <div class="pl-3.5 flex border-l border-br1">
                      <status-select
                          :label="'Update All:'"
                      ></status-select>
                  </div>
              </aside>
          </div>
          <ul>
              <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                  <section class="flex w-full justify-between mb-4">
                      <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                      <status-select
                       :label="'Update Status:'"
                      ></status-select>
  
                  </section>
                  <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                  
              </li>
              <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                  <section class="flex w-full justify-between mb-4">
                      <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                      <status-select
                       :label="'Update Status:'"
                      ></status-select>
  
                  </section>
                  <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                  
              </li>
              <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                  <section class="flex w-full justify-between mb-4">
                      <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                      <status-select
                       :label="'Update Status:'"
                      ></status-select>
  
                  </section>
                  <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                  
              </li>
              <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                  <section class="flex w-full justify-between mb-4">
                      <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                      <status-select
                       :label="'Update Status:'"
                      ></status-select>
  
                  </section>
                  <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                  
              </li>
              <li class="w-full rounded-md px-4 py-2 bg-grey mb-4">
                  <section class="flex w-full justify-between mb-4">
                      <p class="font-medium leading-6 text-txt_dark">Broken Toilet <span class="text-secondary ml-1">Apt T-69, Sean Apartments </span> </p>
                      <status-select
                       :label="'Update Status:'"
                      ></status-select>
  
                  </section>
                  <a class="text-sm leading-6 text-txt_dark cursor-pointer underline" @click="openModal({})">View full details</a>
                  
              </li>
          </ul>
      </section>
    </div>
  
      <modal-component ref="viewRequestModal" title="B-29 Brina Apartments" @close="onModalClose" :button_label="'Save Changes'">
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
                      <p class="text-txt_dark leading-7">Last night my roof began to leak right above my bed.    Second room on your left.</p>
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
                          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_4249_15161)">
                              <path d="M16.3333 4.66667V16.3333H4.66667V4.66667H16.3333ZM16.3333 3H4.66667C3.75 3 3 3.75 3 4.66667V16.3333C3 17.25 3.75 18 4.66667 18H16.3333C17.25 18 18 17.25 18 16.3333V4.66667C18 3.75 17.25 3 16.3333 3ZM12.2833 10.3833L9.78333 13.6083L8 11.45L5.5 14.6667H15.5L12.2833 10.3833Z" fill="#323232"/>
                              </g>
                              <defs>
                              <clipPath id="clip0_4249_15161">
                              <rect width="20" height="20" fill="white" transform="translate(0.5 0.5)"/>
                              </clipPath>
                              </defs>
                          </svg>
                          <p class="font-medium text-sm leading-6 text-txt_dark">IMG.9876.JPG</p>
                      </div>
                  </div>
              </li>
              <li>
                  <status-select :label="'Service Request Status:'"/>
              </li>
          </ul>
      </modal-component>
    
  </template>
  
  <script>
  import StatusSelect from '@/components/StatusSelect.vue';
  import IconSearch from "../../components/icons/IconSearch.vue"
  import Modal from '@/components/Modal.vue';
  export default {
      data() {
          return {
              selected_tab: 'pending',
              selected_Request: {}
          }
      },
      components: {
          'search-icon': IconSearch,
          'status-select': StatusSelect,
          'modal-component': Modal,
  
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
      }
  }
  </script>
  
  <style>
  
  </style>