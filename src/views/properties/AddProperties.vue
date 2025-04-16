<template>
    <div class="bg-neutral py-5 px-10 w-full overflow-y-scroll h-screen pb-40">
      <p class="text-txt_dark font-semibold text-2xl leading-7 uppercase mb-10">Add Properties</p>
      <section class="flex gap-14 w-full flex-wrap">
        <div>
            <p class="text-secondary font-medium mb-4 text-xl leading-6">Property Information</p>
            <form class="auth_form bg-white rounded-xl max-w-[700px]" @submit.prevent="handleRegisterAdmin()">
            <!-- form block  -->
            <div class="w-full">
                <label for="name" class="input_label">
                    Property Name
                </label>
                <input id="name" name="name" class="input mt-4 mb-10" v-model="name"  />
            </div>
            <!-- form block  -->
            <div class="w-full">
                <label for="address" class="input_label">
                    Property Address
                </label>
                <input id="address" name="address" class="input mt-4 mb-10" v-model="address"  />
            </div>
            <section class="flex gap-4 phone:flex-col">
            <!-- form block  -->
                <div class="w-full">
                    <label for="zipCode" class="input_label">
                        Zip Code
                    </label>
                    <input id="zipCode" name="zipCode" class="input mt-4 mb-10" v-model="zipCode"  />
                </div>
            <!-- form block  -->
                <div class="w-full">
                    <label for="province" class="input_label">
                        Province
                    </label>
                    <input id="province" name="province" class="input mt-4 mb-10" v-model="province"  />
                </div>
            <!-- form block  -->
                <div class="w-full">
                    <label for="units" class="input_label">
                        Number Of Units
                    </label>
                    <input id="units" name="units" class="input mt-4 mb-10" v-model="units"  />
                </div>
            </section>
            <!-- form block  -->
            <label for="description" class="input_label">
                Description
            </label>
            <input id="description" name="description" class="input mt-4 mb-10" v-model="description"  />
            <section class="flex gap-4 phone:flex-col">
            <!-- form block  -->
                <div class="w-full">
                    <label for="rent" class="input_label">
                        Rent (per month)
                    </label>
                    <input id="rent" name="rent" class="input mt-4 mb-10" v-model="rent"  />
                </div>
            <!-- form block  -->
                <div class="w-full">
                    <label for="securityDeposit" class="input_label">
                        Security Deposit
                    </label>
                    <input id="securityDeposit" name="securityDeposit" class="input mt-4 mb-10" v-model="securityDeposit"  />
                </div>
            </section>
            <section class="flex justify-between flex-wrap mb-[30px]">
                <ul class="flex flex-col gap-2 w-40">
                    <li class="list-disc text-secondary text-xl leading-6">Unit Types</li>
                    <li class="flex gap-2 cursor-pointer" v-for="(item, i) in unitTypes" :key="`${item}${i}`" @click="toggleSelect(item,'types')">
                        <input type="checkbox" class="w-[22px] h-[22px]" :checked="unitType == item" />
                        <p class="text-secondary text-xl leading-6 font-normal">{{ item }}</p>
                    </li>
                </ul>
                <ul class="flex flex-col gap-2 w-72">
                    <li class="list-disc text-secondary text-xl leading-6">Amenities</li>
                    <li class="flex gap-2 cursor-pointer" v-for="(amenity, i) in amenityList" :key="`${amenity.amenityId}${i}`" @click="toggleSelect(amenity.name,'amenities')">
                        <input type="checkbox" class="w-[22px] h-[22px]" :checked="amenities.includes(amenity.name)" />
                        <p class="text-secondary text-xl leading-6 font-normal">{{ amenity.name }}</p>
                    </li>
                    <li class="flex gap-5 cursor-pointer" @click="openModal()">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.125V19.125" stroke="#496580" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 12.125H19" stroke="#496580" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="text-br1 text-xl leading-6">Add amenity</p>  
                    </li>
                </ul>
            </section>
            <ul class="w-full flex gap-4 mb-[30px] phone:flex-wrap ">
                <li class="relative w-full h-[120px]" v-for="file in images" :key="file">
                    <div class="absolute right-1 top-1 cursor-pointer" @click="removeImage(file)">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9.5" cy="9.125" r="8.5" fill="#808097" stroke="white"/>
                            <path d="M12.5 6.125L6.5 12.125M6.5 6.125L12.5 12.125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <img :src="file" class="w-full h-full object-cover rounded-lg" :alt="`${name} preview`"  />
                </li>
                <li v-if="images.length < 5 " class="w-full flex flex-col gap-2 text-center relative rounded-lg border border-dashed border-br4 py-[30px] px-2 h-[120px]">
                    <input type="file" accept="image/png, image/jpeg, image/jpg" multiple max="5" class="opacity-0 w-full h-full absolute cursor-pointer" @change="handleUploadImages" />
                    <svg class="mx-auto" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 8.125H15.51M3.5 16.125L8.5 11.125C9.428 10.232 10.572 10.232 11.5 11.125L16.5 16.125M14.5 14.125L15.5 13.125C16.428 12.232 17.572 12.232 18.5 13.125L21.5 16.125M3.5 6.125C3.5 5.32935 3.81607 4.56629 4.37868 4.00368C4.94129 3.44107 5.70435 3.125 6.5 3.125H18.5C19.2956 3.125 20.0587 3.44107 20.6213 4.00368C21.1839 4.56629 21.5 5.32935 21.5 6.125V18.125C21.5 18.9206 21.1839 19.6837 20.6213 20.2463C20.0587 20.8089 19.2956 21.125 18.5 21.125H6.5C5.70435 21.125 4.94129 20.8089 4.37868 20.2463C3.81607 19.6837 3.5 18.9206 3.5 18.125V6.125Z" stroke="#808097" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-xs leading-[14px] text-secondary">Upload or drag an <br/> image here </p>
                </li>
            </ul>
            
            <button class="btn btn_primary" :disabled="isDisabled()">
                Add Accommodation
            </button>
            </form>
        </div>
        <div v-if="name || address || description || rent || zipCode || province || units">
            <p class="mb-3 text-primary text-xl leading-6">Quick Preview</p>
            <div class="w-full max-w-[343px] cursor-pointer mb-3" :key="property">
                <img class="m-0 p-0 rounded-t-xl w-full object-contain" />
                <div class="bg-white w-full border pt-4 px-2 pb-2 text-left flex flex-col gap-2 rounded-b-md">
                    <h1 class="text-primary font-semibold text-2xl leading-7">{{name}}</h1>
                    <div class="flex gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 7.33594C6 7.86637 6.21071 8.37508 6.58579 8.75015C6.96086 9.12522 7.46957 9.33594 8 9.33594C8.53043 9.33594 9.03914 9.12522 9.41421 8.75015C9.78929 8.37508 10 7.86637 10 7.33594C10 6.8055 9.78929 6.2968 9.41421 5.92172C9.03914 5.54665 8.53043 5.33594 8 5.33594C7.46957 5.33594 6.96086 5.54665 6.58579 5.92172C6.21071 6.2968 6 6.8055 6 7.33594Z" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.7687 11.1045L8.94006 13.9331C8.69006 14.1829 8.35112 14.3232 7.99773 14.3232C7.64434 14.3232 7.30541 14.1829 7.0554 13.9331L4.22607 11.1045C3.48021 10.3586 2.97229 9.40827 2.76652 8.37371C2.56076 7.33916 2.66639 6.26681 3.07007 5.29229C3.47374 4.31777 4.15733 3.48483 5.03439 2.89881C5.91144 2.31279 6.94258 2 7.9974 2C9.05222 2 10.0834 2.31279 10.9604 2.89881C11.8375 3.48483 12.5211 4.31777 12.9247 5.29229C13.3284 6.26681 13.434 7.33916 13.2283 8.37371C13.0225 9.40827 12.5146 10.3586 11.7687 11.1045Z" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="text-txt_dark text-sm leading-4">{{address}},{{province}}, {{zipCode}}, Canada</p>
                    </div>
                    <div class="flex gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.66667 14V9.33333L5.33333 6L2 9.33333V14H5.33333M8.66667 14H5.33333M8.66667 14H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2H6.66667C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V6.66667M5.33333 14V11.3333M8.66667 4.66667V4.67333M11.3333 4.66667V4.67333M11.3333 7.33333V7.34M11.3333 10V10.0067" stroke="#404164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="text-txt_dark text-sm leading-4">{{units}} Units</p>
                    </div>
                    <button class="btn btn_primary h-[43px] py-[9px] font-medium">
                        View Full details
                    </button>
                </div>
            </div>
            <section class="flex gap-0.5 rounded-md px-1 py-1.5 bg-bg2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4578_3270)">
                    <path d="M8.0026 14.6693C11.6845 14.6693 14.6693 11.6845 14.6693 8.0026C14.6693 4.32071 11.6845 1.33594 8.0026 1.33594C4.32071 1.33594 1.33594 4.32071 1.33594 8.0026C1.33594 11.6845 4.32071 14.6693 8.0026 14.6693Z" stroke="#1A7D36" stroke-width="1.5"/>
                    <path d="M8 11.3359V7.33594" stroke="#1A7D36" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M8.0026 4.66667C8.37079 4.66667 8.66927 4.96514 8.66927 5.33333C8.66927 5.70152 8.37079 6 8.0026 6C7.63441 6 7.33594 5.70152 7.33594 5.33333C7.33594 4.96514 7.63441 4.66667 8.0026 4.66667Z" fill="#1A7D36"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4578_3270">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <p class="text-tgr font-medium text-sm leading-4">This is a preview when your property is published </p>
            </section>
        </div>
      </section>

      <modal-component ref="addAmenityModal" title="Add Amenity"  @submit="onModalSubmit" :button_label="'Add Amenity'">
        <ul class="flex flex-col gap-11 w-full max-w-[768px] mx-auto px-9">
            <li>
                <label for="name" class="input_label">
                    Name * 
                </label>
                <input id="name" placeholder="Amenity" name="name" type="text" class="input mt-4" v-model="newAmenity.name" />
            </li>
            <li>
                <label for="image" class="input_label">
                    Image Upload * 
                </label>
                <div v-if="!this.newAmenity.image" class="w-full flex flex-col gap-2 text-center relative rounded-lg border border-dashed border-br4 py-8 px-2 h-[120px] mt-4">
                    <input type="file" accept="image/png, image/jpeg, image/jpg" class="opacity-0 w-full h-full absolute cursor-pointer" @change="handleUploadImages2" />
                    <svg class="mx-auto" width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.5 21.3333H40.5267M8.5 42.6667L21.8333 29.3333C24.308 26.952 27.3587 26.952 29.8333 29.3333L43.1667 42.6667M37.8333 37.3333L40.5 34.6667C42.9747 32.2853 46.0253 32.2853 48.5 34.6667L56.5 42.6667M8.5 16C8.5 13.8783 9.34286 11.8434 10.8431 10.3431C12.3434 8.84286 14.3783 8 16.5 8H48.5C50.6217 8 52.6566 8.84286 54.1569 10.3431C55.6571 11.8434 56.5 13.8783 56.5 16V48C56.5 50.1217 55.6571 52.1566 54.1569 53.6569C52.6566 55.1571 50.6217 56 48.5 56H16.5C14.3783 56 12.3434 55.1571 10.8431 53.6569C9.34286 52.1566 8.5 50.1217 8.5 48V16Z" stroke="#808097" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-xs leading-[14px] text-secondary">Upload or drag an image <br/> here </p>
                </div>
                <div class="my-8 flex gap-2" v-else>
                    <img :src="newAmenity.image.secure_url" class="w-[50px] h-[50px]" alt="Amenity icon"/>
                    <p class="text-lg text-txt_dark my-auto">{{ newAmenity.image.name + '.' + newAmenity.image.format }}</p>
                </div>
            </li>
            <li>
                <label for="keywords" class="input_label">
                    Keywords
                </label>
                <input id="keywords" placeholder="e.g pool, swimming" name="keywords" type="text" class="input mt-4" v-model="newAmenity.keywords" />
            </li>
            
        </ul>
      </modal-component>
    </div>
</template>
  
<script>
  import { AddAmenities, AddProperties, FetchAmenities, FetchUnitTypes } from '@/api/properties';
  import Modal from '@/components/Modal.vue';
  import { useUserStore } from '@/store';
  import handleError from '@/utils/handleError';
  import { handleToast, uploadImage, uploadImages } from '@/utils/helper';
  import vueSelect from 'vue-select';
  
  export default {
      components: {
          'vue-select': vueSelect,
          'modal-component': Modal,
      },
      created(){
          this.handleFetchUnitTypes();
          this.handleFetchAmenities();
      },
      data() {
          return {
              name: '',
              images: [],
              files: [],
              address: '',
              description: '',
              email: '',
              zipCode: '',
              province: '',
              unitType: '',
              securityDeposit: '',
              rent: '',
              units: '',
              amenities: [],
              unitTypes: [],
              amenityList: ['Elevator','Laundry','Parking','Fitness','Storage', 'Security','WheelChair Accessible', 'Heat'],
              store: useUserStore(),
              newAmenity: {
                name: '',
                image: '',
                keywords: '',
              }
          }
      },
      methods: {
        openModal() {
            this.$refs.addAmenityModal.openModal();
        },
        onModalSubmit() {
            if(!this.newAmenity.name || !this.newAmenity.image.secure_url){
                return ;
            }
            const payload = {
                name: this.newAmenity.name,
                image: this.newAmenity.image.secure_url,
                amenitiesKeyWords: this.newAmenity.keywords
            }
            AddAmenities(payload).then(response => {
                if(response.responseCode == '00'){
                    this.amenityList = [...this.amenityList, response.savedAmenity]
                    this.$refs.addAmenityModal.closeModal();
                    this.newAmenity = {name: '',keywords: '',image: ''}
                    return handleToast('Amenity added successfully','success');
                }
            });
        },
        handleFetchUnitTypes(){
            FetchUnitTypes().then(response => {
                if(response){
                    this.unitTypes = response
                }else handleError(response)
            })
        },
        handleFetchAmenities(){
            FetchAmenities().then(response => {
                if(response.responseCode == '00'){
                    this.amenityList = response.amenities.items
                }else handleError(response)
            })
        },
        handleUploadImages(e){
            const files = Object.values(e.target.files);
            if (files.length > 0) {
                files.forEach(item => {
                    this.files = [...this.files, item];
                    return this.images = [...this.images, URL.createObjectURL(item)];
                })
            }
        },
        handleUploadImages2(e){
            const file = e.target.files[0];
            uploadImage(file).then(image => {
                const newImage = {
                    secure_url: image.secure_url,
                    name: image.original_filename,
                    format: image.format
                }
                this.newAmenity.image = newImage;
            })
        },
        isDisabled(){
            if(!this.name || !this.address || !this.description || !this.rent || !this.zipCode || !this.securityDeposit){
                return true;
            }
            else return false;
        },
        handleFormReset(){
            this.name = '';
            this.address = '';
            this.description = '';
            this.email = '';
            this.zipCode = '';
            this.unitType = '';
            this.province = '';
            this.rent = '';
            this.units = '';
            this.securityDeposit = '';
            this.amenities = [];
            this.amenityList = [];
        },
        async handleCreateProperty(){
            uploadImages(this.files).then(images => {
                const payload = {
                    name: this.name,
                    description: this.description,
                    address: this.address,
                    referenceNumber: this.referenceNumber || '',
                    landlordId: this.store.userProfile.adminUserId,
                    coordinates: this.coordinates,
                    minimumRent: this.rent,
                    maximumRent: this.rent,
                    images,
                    isActive: true
                }
                AddProperties(payload).then(response => {
                    if(response.result && response.result.responseCode == '00'){
                        this.handleFormReset();
                        handleToast("Property Added Successfully",'success')
                    }else handleError(response)
                })
            })
        },
        toggleSelect(query, key){
            if(key == 'amenities'){
                if(this.amenities.includes(query)){
                    const filteredList = this.amenities.filter(item => item !== query);
                    this.amenities = filteredList;
                } else {
                    this.amenities = [...this.amenities,query];
                }
            } else {
                if(this.unitType !== query){
                    this.unitType = query
                } else {
                    this.unitType = ''
                }
            }
        },  
        removeImage(image){
            const filteredImages = this.images.filter(item => item !== image);
            this.images = filteredImages;
        }
      }
  }
  </script>
  
  <style>
  
  </style>