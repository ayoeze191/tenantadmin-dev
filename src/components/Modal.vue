<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container" ref="modal">
      <div class="modal-content">
        <header v-if="!plain" class="modal-header">
          <button type="button" class="modal-close-btn" @click="closeModal" aria-label="Close Modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#808097"/>
            </svg>
          </button>
          <h2 id="modal-title" class="modal-title">{{ title }}</h2>
        </header>
        <div class="modal-body">
          <slot></slot>
        </div>
        <footer class="modal-footer" v-if="!plain && button_label">
          <button class="btn btn_primary btn_regular" :disabled="is_button_disabled" @click="handleSubmit">{{button_label}}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isOpen: false
    }
  },
  props: {
    title: String,
    button_label: String,
    plain: Boolean,
    style: String,
    is_button_disabled: Boolean
  },
  methods: {
    openModal() {
      this.isOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.isOpen = false
      document.body.style.overflow = ''
      this.$emit("close")
    },
    handleSubmit() {
      this.$emit("submit")
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 15px;
  max-width: 768px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0px 8px 8px 0px #10182808, 0px 4px 3px 0px #1018280A;
}

.modal-content {
  padding: 12px 0 50px;
}

.modal-header {
  padding: 12px 12px;
  position: relative;
}

.modal-title {
  text-align: center;
}

.modal-close-btn {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.modal-body {
  padding: 20px 36px;
}

.modal-footer {
  padding: 0 36px 36px;
  width: 100%;
}

/* Global fix for dropdowns in modals */
:global(.v-menu__content) {
  z-index: 1001 !important;
}
</style>