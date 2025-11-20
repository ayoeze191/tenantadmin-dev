<template>
  <div v-if="type">
    <table>
      <tr class="header-rows">
        <th
          v-for="(header, i) in headers"
          :key="`${header}${i}`"
          class="header-item"
        >
          {{ header }}
        </th>
      </tr>
      <tr
        v-for="entity in data"
        :key="`entity-${entity.name}`"
        class="table-rows"
      >
        <td v-for="(header, i) in headers" :key="`${header}-${i}`">
          <slot :name="`column${i}`" :entity="entity"></slot>
        </td>
      </tr>
    </table>
  </div>

  <div v-else class="table_container">
    <div class="table">
      <div class="table-header">
        <div
          class="header__item"
          v-for="(header, i) in headers"
          :key="`${header}${i}`"
        >
          <a id="name" class="filter__link" href="#">{{ header }}</a>
        </div>
      </div>
      <div class="table-content">
        <div
          class="table-row"
          v-for="entity in data"
          :key="`entity-${entity.name}`"
        >
          <div
            class="table-data"
            v-for="(header, i) in headers"
            :key="`${header}-${i}`"
          >
            <slot :name="`column${i}`" :entity="entity"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
  word-wrap: break-word;
  border-spacing: 78px;
  text-align: right;
  padding: 10px;
  position: sticky;
  min-width: 700px;
  background-color: #ffffff;
  left: 0;
}

th {
  padding: 13.5px 8px;
}

td {
  text-align: left;
  font-size: 20px;
  line-height: 24.2px;
  padding-bottom: 29px;
  color: #404164;
}

.header-rows {
  background: #f8f8f8;
  padding: 0px 32px;
}

.table-rows {
  padding: 0px 32px;
}

.header-item {
  font-size: 18px;
  line-height: 21.78px;
  text-transform: capitalize;
  color: #98a2b3;
  text-align: left;
  padding-bottom: 16px;
}

.table_container {
  width: 100%;
  min-width: 1150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  z-index: 0;
  min-height: 100vh;
  position: absolute;
  box-sizing: border-box;
}

.table {
  width: 100%;
  display: block;
  z-index: 0;
  position: absolute;
  top: 0px;
}

.table-header {
  display: flex;
  text-align: left;
  width: 100%;
  background: #f8f8f8;
  padding: 0px 8px;
}

.table-row {
  display: flex;
  width: 100%;
  padding: 26px 8px;
  background: #ffffff;
  border-bottom: 1px solid #e2eaeb;
}

.table-row:nth-last-child() {
  border-bottom: unset;
}

.table-data,
.header__item {
  flex: 1 1 20%;
  text-align: left;
  font-size: 20px;
  line-height: 24.2px;
  color: #404164;
  position: relative;
}

.header__item {
  text-transform: uppercase;
  padding: 13.5px 8px;
  width: 290px;
}
.table-data {
  padding: 0px 8px;
  color: #585858;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.3px;
  text-align: left;
  width: 290px;
}
</style>
