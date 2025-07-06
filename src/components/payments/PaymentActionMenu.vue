<template>
  <a-dropdown>
    <a class="ant-dropdown-link cursor-pointer text-xl" @click.prevent>
      <i class="anticon anticon-ellipsis" />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="$emit('notify', payment)"
          >Notify Tenants</a-menu-item
        >
        <a-menu-item @click="$emit('confirm', payment)"
          >Confirm Payment</a-menu-item
        >
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
export default {
  props: { payment: Object },
};
</script>
