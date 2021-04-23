<template>
  <div class="inputGroup">
    <label for="currency">{{ title }}</label>
    <input id="currency" type="number" min="0" v-model.number="value" />
    <select></select>
  </div>
</template>

<script>
export default {
  name: "CurrencyInput",
  props: {
    title: String,
  },
  data: function () {
    return {
      value: 1,
      base: "EUR",
    };
  },
};
</script>

<style scoped lang="scss">
.inputGroup {
}
label {
  display: inline-block;
}

input {
  width: 230px;
  height: 60px;
}
</style>