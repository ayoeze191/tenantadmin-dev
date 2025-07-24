<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :disabled="modelValue === 'Terminate'"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="outlined"
        :class="{
          ss1: modelValue == 'Pending',
          ss2: modelValue == 'Completed',
          ss3: modelValue == 'Terminate',
          ss4: modelValue == 'Requested',
          ss5: modelValue == 'Ongoing',
          'cursor-not-allowed opacity-50': modelValue === 'Terminate',
        }"
        class="status_select"
      >
        {{ modelValue || "Select Status" }}

        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_4249_14653)">
            <path
              v-if="modelValue === 'Ongoing'"
              d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z"
              fill="#F59E0B"
            />

            <path
              v-if="modelValue === 'Requested'"
              d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z"
              fill="#8E6306"
            />

            <path
              v-if="modelValue === 'Pending'"
              d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z"
              fill="#8E6306"
            />

            <path
              v-if="modelValue === 'Completed'"
              d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z"
              fill="#05603A"
            />

            <path
              v-if="modelValue === 'Terminate'"
              d="M6.175 7.65625L10 11.4729L13.825 7.65625L15 8.83125L10 13.8313L5 8.83125L6.175 7.65625Z"
              fill="#A00000"
            />
          </g>

          <defs>
            <clipPath id="clip0_4249_14653">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(option, index) in statusOptions"
        :key="index"
        @click="selectOption(option)"
        class="flex"
      >
        <v-list-item-title class="flex items-center gap-2">
          <span
            class="w-3 h-3 rounded-full my-auto"
            :style="{ backgroundColor: colorMap[option] }"
          ></span>

          <span>{{ option }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "StatusDropdown",

  props: {
    modelValue: {
      type: String,

      default: "",
    },
  },

  created() {
    this.generateRandomColors();
  },

  data() {
    return {
      colorMap: {},

      menu: false,

      statusOptions: [
        "Requested",
        "Pending",
        "Ongoing",
        "Completed",
        "Terminate",
      ],
    };
  },

  methods: {
    selectOption(option) {
      this.$emit("update:modelValue", option);

      this.menu = false;
    },

    generateRandomColors() {
      this.statusOptions.forEach((option) => {
        // Generate a random hex color

        this.colorMap[option] =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      });
    },
  },
};
</script>
