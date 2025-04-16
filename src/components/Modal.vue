<template>
    <dialog ref="modal" @close="handleClose" aria-labelledby="modal-title" class="modal" :class="style">
      <div class="modal-content">
        <header v-if="!plain" class="modal-header">
          <button type="button" class="outline-none border-0 absolute left-2 my-auto" @click="closeModal" aria-label="Close Modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4249_15141)">
                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#808097"/>
                </g>
                <defs>
                <clipPath id="clip0_4249_15141">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
          </button>
          <h2 id="modal-title" class="modal-title">{{ title }}</h2>
        </header>
        <div class="modal-body">
          <slot></slot> <!-- This slot allows injecting content inside the modal -->
        </div>
        <footer class="modal-footer" v-if="!plain && button_label">
          <button class="btn btn_primary btn_regular" :disabled="is_button_disabled" @click="handleSubmit">{{button_label}}</button>
        </footer>
      </div>
    </dialog>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            req: true
        },
        button_label: {
            type: String,
            req: true
        },
        plain: {
          type: Boolean,
          default: false
        },
        style:{
          type: String,
          default: ''
        },
        is_button_disabled: {
          type: Boolean,
          default: false
        }
    },
    methods: {
        openModal() {
        this.$refs.modal.showModal();
        },
        closeModal() {
        this.$refs.modal.close();
        },
        handleClose() {
          this.$emit("close"); // Emit an event when the modal is closed
        },
        handleSubmit() {
          this.$emit("submit"); // Emit an event when the modal is submitted
        },
    }
}
</script>

<style scoped>
.modal {
  border: none;
  border-radius: 15px;
  padding: 0;
  max-width: 768px;
  width: 100%;
  margin: auto;
  box-shadow: 0px 8px 8px 0px #10182808;
  box-shadow: 0px 4px 3px 0px #1018280A;
  position: relative;
}

.modal-content {
  padding: 12px 0px 50px 0px;
  
}
.modal-header{
  padding: 12px 12px;
}
.modal-body {
  padding: 20px 0;
}
.modal-footer {
  padding: 0px 36px;
  width: 100%;
}

</style>