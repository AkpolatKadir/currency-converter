<template>
  <div class="inputGroup">
    <label for="currency">{{ title }}</label>
    <input
      :id="title"
      type="number"
      min="0"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
    />
  </div>
</template>

<script>
export default {
  name: "CurrencyInput",
  props: {
    title: String,
    value: Number,
  },
};
</script>

<style scoped lang="scss">
.inputGroup {
  position: relative;
}
label {
  position: absolute;
  top: -22px;
}

input {
  font-size: 1.5rem;
  width: 230px;
  height: 100%;
}
</style>