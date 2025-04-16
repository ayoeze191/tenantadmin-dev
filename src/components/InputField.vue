<!-- CustomInput.vue -->
<template>
    <label>
      {{ label }}
      <input type="text" :name="name" :value="value" @input="onInput" @change="onChange" />
    </label>
  </template>
  
  <script>
  export default {
    name: 'CustomInput',
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
    /* Can add validation here
    watch: {
      value: {
        handler(newValue, oldValue) {
  
        },
      },
    }, */
    computed: {
      name() {
        return this.label.toLowerCase();
      },
    },
    methods: {
      onInput(event) {
        // Can add validation here
        this.$emit('input', event.target.value);
      },
      onChange(event) { // Supports .lazy
        // Can add validation here
        this.$emit('change', event.target.value);
      },
    },
  }
  </script>